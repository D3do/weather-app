const request = require('request');
const {key} = require('../key.js');

const geocodeAddress = address => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('Unable to connect to mapquestapi service');
    } else if (body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
      console.log('Unable to find that address');
    } else {
      console.log(`Address: ${body.results[0].providedLocation.location}`);
      console.log(`latitude: ${body.results[0].locations[0].latLng.lat}`);
      console.log(`longitude: ${body.results[0].locations[0].latLng.lng}`);
    }
  });
}

module.exports = {
  geocodeAddress
};