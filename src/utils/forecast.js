const request = require('request');

/* const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8ba24659b2be2db986afa3b67b526f79/${latitude},${longitude}?units=si`;

  request({ url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (response.body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `${response.body.daily.data[0].summary} It is currently ${response.body.currently.temperature} degrees out. There is a ${response.body.currently.precipProbability}% chance of rain.`);
    }
  });
} */


// with Destructuring

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/8ba24659b2be2db986afa3b67b526f79/${latitude},${longitude}?units=si`;

  request({ url, json: true}, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees celcius out. This high today is ${body.daily.data[0].temperatureHigh} degree celcius, with a low of ${body.daily.data[0].temperatureLow} degree celcius. There is a ${body.currently.precipProbability}% chance of rain.`);
    }
  });
}

module.exports = forecast;