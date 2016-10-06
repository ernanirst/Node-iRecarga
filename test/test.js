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

// get values for a DDD and a provider
irecarga.getValuesforProvider('oi', 48, function(err, data){
    console.log('err: ', err)
    console.log('data', data)
})

// make the recharge
irecarga.makeRecharge('vivo', 48, 84841234, '5,00', 'robot', function(err, data){
    console.log('err: ', err)
    console.log('data', data)
})