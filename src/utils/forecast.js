const request=require('request');

const forecast=(address1,adress2 , callback)=>{
    const url =`https://api.darksky.net/forecast/0072e4b9de5f8c148dc8ac1d53f5ab81/${address1},${adress2}`;

    request({url, json:true},(err , {body})=>{
        if (err) {
           callback('internet yomon ',undefined)
        }else if(body.code===400){
           callback(body.code, undefined)
           
        }else{
            callback(undefined,{
                latitude:body.latitude,
                longitude:body.longitude,
                temperature:body.currently.temperature,
                timezone:body.timezone
            })
        }
    })
}

module.exports=forecast;