const request = require('request')

const forecast = (latitude, longitude, callBack) => {
    const url = 'http://api.weatherstack.com/current?access_key=85f431c3f2463b1004d9c3156fe0e33d&query='+ encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+''

    request({ url, json: true }, (error,{ body }) => {
        if(error){
            callBack('Cannot connect to the weather service!', undefined)
        } else if(body.error){
            callBack('Unable to find the location', undefined)
        } else{
            callBack(undefined, body.current.weather_descriptions +' . It is currrently '+ body.current.temperature +'°C but it feels like '+ body.current.feelslike+'°C. Wind speed: '+body.current.wind_speed+'km/h, Humidity: '+body.current.humidity+'%.')
        }
    })
}

module.exports = forecast