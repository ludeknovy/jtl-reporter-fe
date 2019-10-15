import { TestBed, async } from '@angular/core/testing';
import { ProjectApiService } from './project-api.service';
import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { HttpClientModule } from '@angular/common/http';
import * as moment from 'moment';

describe('Projects', () => {

  let provider;

  beforeAll((done) => {
    provider = new PactWeb({
      consumer: 'jtl-reporter-ui',
      provider: 'jtl-reporter-be',
      port: 1234,
      host: '127.0.0.1',
    });

    // required for slower CI environments
    setTimeout(done, 4000);

    // Required if run with `singleRun: false`
    provider.removeInteractions();
  });

  afterAll((done) => {
    provider.finalize().then(done, e => done.fail(e));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ProjectApiService
      ],
    });
  }));

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('/projects', () => {
    describe('GET /projects', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'i have list of existing projects',
          uponReceiving: 'a request for projects',
          withRequest: {
            method: 'GET',
            path: '/projects'
          },
          willRespondWith: {
            status: 200,
            body: Matchers.eachLike({
              id: '0d74df6b-b728-4f45-9e2c-8537cd1c1b85',
              itemCount: 10,
              latestRun: '2019-09-22T18:20:23.265Z',
              projectName: 'test-project',
              scenarioCount: 6
            })
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should return projects', (done) => {
        const projectService: ProjectApiService = TestBed.get(ProjectApiService);
        projectService.fetchProjects().subscribe(response => {
          expect(response).toEqual(jasmine.any(Array));
          response.forEach((_) => {
            expect(_.id).toEqual(jasmine.any(String));
            expect(_.projectName).toEqual(jasmine.any(String));
            expect(_.itemCount).toEqual(jasmine.any(Number));
            expect(_.scenarioCount).toEqual(jasmine.any(Number));
            expect(moment(_.latestRun, moment.ISO_8601).isValid()).toBe(true);
            expect(_.id.length).toBeGreaterThan(0);
            expect(_.projectName.length).toBeGreaterThan(0);
          });
          done();
        });
      });
    });
    describe('POST /projects', () => {
      beforeAll((done) => {
        provider.addInteraction({
          uponReceiving: 'a request for creating projects',
          withRequest: {
            method: 'POST',
            path: '/projects',
            body: {
              projectName: Matchers.somethingLike(`project-name`)
            },
            headers: {
              'Content-Type': 'application/json'
            },
          },
          willRespondWith: {
            status: 201,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should be able to create new project', (done) => {
        const projectService: ProjectApiService = TestBed.get(ProjectApiService);
        projectService.createNewProject({ projectName: 'demo-project' }).subscribe(response => {
          // @ts-ignore
          expect(response.status).toBe(201);
          done();
        });
      });
    });
  });

  describe('/projects/:projectName', () => {
    describe('PUT /projects/:projectName', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'i have existing project',
          uponReceiving: 'a request for updating project',
          withRequest: {
            method: 'PUT',
            path: '/projects/test-project',
            body: {
              projectName: Matchers.somethingLike(`project-name`)
            },
            headers: {
              'Content-Type': 'application/json'
            }
          },
          willRespondWith: {
            status: 204,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should be able to update project', (done) => {
        const projectService: ProjectApiService = TestBed.get(ProjectApiService);
        projectService.updateProject('test-project', { projectName: 'test-project-1' }).subscribe(response => {
          expect(response.status).toEqual(204);
          done();
        });
      });
    });
    describe('DELETE /project/:projectName', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'i have existing project',
          uponReceiving: 'a request for deleting project',
          withRequest: {
            method: 'DELETE',
            path: '/projects/test-project',
          },
          willRespondWith: {
            status: 204,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should be able to delete project', (done) => {
        const projectService: ProjectApiService = TestBed.get(ProjectApiService);
        projectService.deleteProject('test-project').subscribe(response => {
          expect(response.status).toEqual(204);
          done();
        });
      });
    });
  });

  describe('/projects/overall-stats', () => {
    beforeAll((done) => {
      provider.addInteraction({
        state: 'i have existing overall stats',
        uponReceiving: 'a request for overall-stats',
        withRequest: {
          method: 'GET',
          path: '/projects/overall-stats'
        },
        willRespondWith: {
          status: 200,
          body: Matchers.somethingLike({
            avgDuration: 22,
            avgVu: 52,
            totalDuration: 9109,
            totalRunCount: 416
          })
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(done, e => done.fail(e));
    });
    it('should return overall stats', (done) => {
      const projectService: ProjectApiService = TestBed.get(ProjectApiService);
      projectService.fetchOverallStats().subscribe(response => {
        expect(response.avgDuration).toEqual(jasmine.any(Number));
        expect(response.avgVu).toEqual(jasmine.any(Number));
        expect(response.totalDuration).toEqual(jasmine.any(Number));
        expect(response.totalRunCount).toEqual(jasmine.any(Number));
        done();
      });
    });
  });


  describe('/projects/latest-items', () => {
    beforeAll((done) => {
      provider.addInteraction({
        state: 'i have a list of latest items',
        uponReceiving: 'a request for latest items',
        withRequest: {
          method: 'GET',
          path: '/projects/latest-items',
        },
        willRespondWith: {
          status: 200,
          body: Matchers.eachLike({
            environment: 'test',
            id: 'b13373a3-4d27-4752-977a-2f42a2606595',
            name: 'test-scenario',
            project_name: 'test-project',
            // tslint:disable-next-line:max-line-length
            upload_time: Matchers.term({ generate: '2019-09-22T18:20:23.265Z', matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z' }),
            status: '0'
          }, { min: 1 }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, e => done.fail(e));
    });

    it('should return latest items', (done) => {
      const projectService: ProjectApiService = TestBed.get(ProjectApiService);
      projectService.fetchLatestItems().subscribe(response => {
        // @ts-ignore
        expect(response.length).toBeGreaterThan(0);
        response.forEach((_) => {
          expect(_.environment).toEqual(jasmine.any(String));
          expect(_.id).toEqual(jasmine.any(String));
          expect(_.name).toEqual(jasmine.any(String));
          expect(_.status).toEqual(jasmine.any(String));
          expect(_.project_name).toEqual(jasmine.any(String));
          expect(_.environment.length).toBeGreaterThan(0);
          expect(_.id.length).toBeGreaterThan(0);
          expect(_.name.length).toBeGreaterThan(0);
          expect(_.project_name.length).toBeGreaterThan(0);
          expect(_.status.length).toEqual(1);
          expect(moment(_.upload_time, moment.ISO_8601).isValid()).toBe(true);
        });
        done();
      });
    });
  });
});
