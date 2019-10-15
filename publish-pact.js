let projectFolder = __dirname;
let pact = require('@pact-foundation/pact-node');
let project = require('./package.json');

let options = {
  pactFilesOrDirs: [projectFolder + '/pacts'],
  pactBroker: 'https://jtl-reporter.pact.dius.com.au',
  consumerVersion: project.version,
  tags: ['latest'],
  pactBrokerToken: process.env.PACT_BROKER_TOKEN
};
pact.publishPacts(options).then(function () {
  console.log("Pacts successfully published!");
});