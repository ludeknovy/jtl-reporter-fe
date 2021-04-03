import { TestBed, async } from '@angular/core/testing';
import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { HttpClientModule } from '@angular/common/http';
import { ScenarioApiService } from './scenario-api.service';
import * as moment from 'moment';

describe('Scenario', () => {

  let provider;

  beforeAll((done) => {
    provider = new PactWeb({
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
        ScenarioApiService
      ],
    });
  }));

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('/projects/:projectName/scenarios', () => {
    describe('GET /projects/:projectName/scenarios', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'there is at least one existing test item',
          uponReceiving: 'a request for scenarios',
          withRequest: {
            method: 'GET',
            path: '/projects/test-project/scenarios'
          },
          willRespondWith: {
            status: 200,
            body: Matchers.eachLike({
              name: 'test-scenario',
              id: 'e3d1cde2-6079-4b01-8592-4bde15ae6ed7',
              data: Matchers.eachLike({
                avgLatency: '372',
                avgResponseTime: 373,
                duration: 11.99,
                // tslint:disable-next-line:max-line-length
                endDate: Matchers.term({ generate: '2019-07-24T13:12:20.807Z', matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z' }),
                errorRate: 0.48,
                maxVu: 10,
                percentil: 658,
                // tslint:disable-next-line:max-line-length
                startDate: Matchers.term({ generate: '2019-07-24T12:00:21.156Z', matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z' }),
                throughput: 24.81,
              })
            })
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should return scenario lists', (done) => {
        const projectService: ScenarioApiService = TestBed.get(ScenarioApiService);
        projectService.fetchScenarios('test-project').subscribe(response => {
          expect(response).toEqual(jasmine.any(Array));
          response.forEach((_) => {
            expect(_.id).toEqual(jasmine.any(String));
            expect(_.name).toEqual(jasmine.any(String));
            expect(_.id.length).toBeGreaterThan(0);
            expect(_.name.length).toBeGreaterThan(0);
            expect(_.data).toEqual(jasmine.any(Array));
            _.data.forEach((d) => {
              expect(d.avgLatency).toEqual(jasmine.any(String));
              expect(d.avgResponseTime).toEqual(jasmine.any(Number));
              expect(d.duration).toEqual(jasmine.any(Number));
              expect(d.errorRate).toEqual(jasmine.any(Number));
              expect(d.maxVu).toEqual(jasmine.any(Number));
              expect(d.percentil).toEqual(jasmine.any(Number));
              expect(d.throughput).toEqual(jasmine.any(Number));
              expect(moment(d.startDate, moment.ISO_8601).isValid()).toBe(true);
              expect(moment(d.endDate, moment.ISO_8601).isValid()).toBe(true);
            });
          });
          done();
        });
      });
    });
    describe('POST /project/:projectName/scenarios', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'there is existing project',
          uponReceiving: 'a request for creating new scenario',
          withRequest: {
            method: 'POST',
            path: '/projects/test-project/scenarios',
            body: {
              scenarioName: Matchers.somethingLike(`new-test-scenario`)
            },
            headers: {
              'Content-Type': 'application/json'
            }
          },
          willRespondWith: {
            status: 201,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should be able to create new scenario', (done) => {
        const scenarioService: ScenarioApiService = TestBed.get(ScenarioApiService);
        scenarioService.createNewScenario('test-project', { scenarioName: 'new-scenario' }).subscribe(response => {
          // @ts-ignore
          expect(response.status).toEqual(201);
          done();
        });
      });
    });
  });
  describe('/project/:projectName/scenarios/:scenarioName', () => {
    describe('PUT /project/:projectName/scenarios/:scenarioName', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'there is existing project with at least one scenario',
          uponReceiving: 'a request for updating scenario',
          withRequest: {
            method: 'PUT',
            path: '/projects/test-project/scenarios/test-scenario',
            body: Matchers.somethingLike({
              scenarioName: 'new-scenario-name',
              analysisEnabled: true,
              thresholds: {
                throughput: 1,
                percentile: 1,
                errorRate: 1,
                enabled: false,
              }
            }),
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
      it('should be able to update scenario ', (done) => {
        const scenarioService: ScenarioApiService = TestBed.get(ScenarioApiService);
        scenarioService.updateScenario('test-project', 'test-scenario',
          {
            scenarioName: 'new-name', analysisEnabled: true,
            thresholds: {
              throughput: 1,
              percentile: 1,
              errorRate: 1,
              enabled: false,
            }
          }).subscribe(response => {
            // @ts-ignore
            expect(response.status).toEqual(204);
            done();
          });
      });
    });
    describe('DELETE /project/:projectName/scenarios/:scenarioName', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'there is existing project with at least one scenario',
          uponReceiving: 'a request for deleting scenario',
          withRequest: {
            method: 'DELETE',
            path: '/projects/test-project/scenarios/test-scenario',
          },
          willRespondWith: {
            status: 204,
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should be able to delete scenario', (done) => {
        const scenarioService: ScenarioApiService = TestBed.get(ScenarioApiService);
        scenarioService.deleteScenario('test-project', 'test-scenario').subscribe(response => {
          // @ts-ignore
          expect(response.status).toEqual(204);
          done();
        });
      });
    });
    describe('GET /project/:projectName/scenarios/:scenarioName/trends', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'there is existing project with at least one scenario and test runs',
          uponReceiving: 'a request for scenario trends',
          withRequest: {
            method: 'GET',
            path: '/projects/test-project/scenarios/test-scenario/trends',
          },
          willRespondWith: {
            status: 200,
            body: Matchers.eachLike({
              id: 'e3d1cde2-6079-4b01-8592-4bde15ae6ed7',
              overview: Matchers.somethingLike({
                avgLatency: 372,
                avgResponseTime: 373,
                duration: 11.99,
                endDate: Matchers.term({ generate: '2019-07-24T13:12:20.807Z', matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z' }),
                errorRate: 0.48,
                maxVu: 10,
                percentil: 658,
                startDate: Matchers.term({ generate: '2019-07-24T12:00:21.156Z', matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{3}Z' }),
                throughput: 24.81,
                avgConnect: 10,
                bytesPerSecond: 1000,
              })
            })
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should be able to fetch scenario trends', (done) => {
        const scenarioService: ScenarioApiService = TestBed.get(ScenarioApiService);
        scenarioService.fetchScenarioTrend('test-project', 'test-scenario').subscribe(response => {
          // @ts-ignore
          console.log(response);
          done();
        });
      });
    })
  });
});
