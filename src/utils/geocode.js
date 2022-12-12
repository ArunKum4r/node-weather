const request = require('request')

const geoCode = (address, callBack) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiYXJ1bmt1bWFyc3ViYnVyYWoiLCJhIjoiY2xiNHM3emtiMDJlZzNwbWRmdXJ1NmVreiJ9.2UaVmTS7ljcM1_suksju3Q&limit=1'

    request({ url, json: true }, (error,{body}) =>{
        if (error) {
            callBack('Cannot connect to location services', undefined)
        } else if (body.features.length === 0) {
            callBack('No matching results. Try another search', undefined)
        }else{
            callBack(undefined,
                {longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name})
        }
    })
}

module.exports = geoCode