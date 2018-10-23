const request = require('request');
const {key} = require('../key.js');

const geocodeAddress = (address, callback) => {
  const encodedAddress = encodeURIComponent(address);

  request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${encodedAddress}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to mapquestapi service');
    } else if (body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
      callback('Unable to find that address');
    } else {
      callback(undefined, {
        address: body.results[0].providedLocation.location,
        latitude: body.results[0].locations[0].latLng.lat,
        longitude: body.results[0].locations[0].latLng.lng
      });
    }
  });
}

module.exports.geocodeAddress = geocodeAddress;