const request = require('request');

const {forecastKey} = require('../key');


const getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${forecastKey}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io servers.');
    } else if (!error && response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    } else {
      callback('Unable to fetch weather');
    }
  });
};

module.exports.getWeather = getWeather;