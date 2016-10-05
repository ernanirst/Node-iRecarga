// module declaration
var irecarga = require('../')({
    username: process.env.IRECARGA_USERNAME,
    password: process.env.IRECARGA_PASSWORD
})

// update token and returns some profile data
irecarga.validateLoginSenha(function(err, data){
    console.log('err: ', err)
    console.log('data', data)
    console.log('token', irecarga.token)
})

// get providers for a specific DDD
irecarga.getServiceProviders(48, function(err, data){
    console.log('err: ', err)
    console.log('data', data)
})