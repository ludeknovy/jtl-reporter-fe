import { TestBed, async } from '@angular/core/testing';
import { PactWeb, Matchers } from '@pact-foundation/pact-web';
import { HttpClientModule } from '@angular/common/http';
import { ItemsApiService } from './items-api.service';

describe('Items', () => {

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
        ItemsApiService
      ],
    });
  }));

  afterEach((done) => {
    provider.verify().then(done, e => done.fail(e));
  });

  describe('/projects/:projectName/scenarios/:scenarionName/items/:id/share-tokens', () => {
    describe('GET /projects/:projectName/scenarios/:scenarionName/items/:id/share-tokens', () => {
      beforeAll((done) => {
        provider.addInteraction({
          state: 'there is at least one existing test item',
          uponReceiving: 'a request for test item',
          withRequest: {
            method: 'GET',
            path: '/projects/test-project/scenarios/test-scenario/items/28b32386-2c69-41fc-ab98-8b16ef4823af/share-tokens'
          },
          willRespondWith: {
            status: 200,
            body: Matchers.eachLike({
              name: 'token name',
              id: 'e3d1cde2-6079-4b01-8592-4bde15ae6ed7',
              token: "93ca7b28a9a97d0f80ec815ddcf046274dcb25fdef5583f7b15fa04c6990300a20a08281fa5838"
            })
          },
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(done, e => done.fail(e));
      });
      it('should return item share tokens', (done) => {
        const itemApiService: ItemsApiService = TestBed.get(ItemsApiService);
        itemApiService.fetchItemShareTokens('test-project', 'test-scenario', '28b32386-2c69-41fc-ab98-8b16ef4823af').subscribe(response => {
          console.log(response)
          done();
        });
        done();
      });
    });
  });
});
