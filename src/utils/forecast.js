const request = require("request")


const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=ddc7fa90bef53936440edc57c9c36c3d&query= ' + latitude + ',' + longitude + '&unit=f'

    request({ url , json: true}, (error, { body }) =>{
        if (error){
            callback('unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('unable to connect', undefined)
        } else {
            callback(undefined, 'Temperature: ' + body.current.temperature + ' Humidity: ' + body.current.humidity )
            
        }
    })
} 
   
module.exports = forecast