const request=require('request');

const geocode = (adress, callback) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${adress}.json?access_token=pk.eyJ1IjoiYWtiYXJib2JvbXVyb2RvdiIsImEiOiJjanoxbGF5MmgwbWVlM2dsa2lobDk3cmEwIn0.CBKilWqdTvy_GaKhQ7FRJA&limit=1`
    request({ url, json: true }, (err, {body}) => {
        if (err) {
            callback('internet yaxshimas', undefined)
        } else if (body.features.length === 0) {
            callback('sizning yunalishingiz mos tushmaydi', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports=geocode;