const request = require('request')
const querystring = require('querystring')

var Error = function (status, description){
    return {status: status, description: description}
}

exports.getJSONHttpPost = function (url, params, callback){
    //var request = require('request');
    
    request({
        url: url,
        method: 'POST',
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: querystring.stringify(params)
    }, function (error, response, body) {
        if (error !== true && response.statusCode === 200) {
            try{
                body = JSON.parse(body);
            }catch(e){
                callback(Error(true, 'Could not parse JSON'), body)
            }
            callback(Error(false, null), body)
        } else {
            callback(Error(true, 'HTTP POST failed'), body)
        }
    });
}