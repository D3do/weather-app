const request = require('request');
const yargs = require('yargs');
const {key} = require('./key');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAddress = encodeURIComponent(argv.address);

request({
  url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
  json: true
}, (error, response, body) => {
  console.log(`Address: ${body.results[0].providedLocation.location}`);
  console.log(`latitude: ${body.results[0].locations[0].latLng.lat}`);
  console.log(`longitude: ${body.results[0].locations[0].latLng.lng}`);
});