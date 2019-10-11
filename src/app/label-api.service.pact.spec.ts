import { TestBed } from '@angular/core/testing';
import { ProjectApiService } from './project-api.service';
import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { HttpClientModule } from '@angular/common/http';

describe('Labels', () => {

  let provider;

  beforeAll(function (done) {
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

  afterAll(function (done) {
    provider.finalize()
      .then(function () {
        done();
      }, function (err) {
        done.fail(err);
      });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        ProjectApiService
      ],
    });
  });

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('project/latest-items', () => {
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
            upload_time: Matchers.term({ generate: '2013-08-16T15:31:20+10:00', matcher: '\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}' })
          }, { min: 1 }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      }).then(done, error => done.fail(error));
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
          expect(_.project_name).toEqual(jasmine.any(String));
          expect(_.environment.length).toBeGreaterThan(0);
          expect(_.id.length).toBeGreaterThan(0);
          expect(_.name.length).toBeGreaterThan(0);
          expect(_.project_name.length).toBeGreaterThan(0);
        });
        done();
      }, error => {
        done.fail(error);
      });
    });

  });
});
