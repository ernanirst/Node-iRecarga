// module declaration
var irecarga = require('../')({
    username: process.env.IRECARGA_USERNAME,
    password: process.env.IRECARGA_PASSWORD
})

// update token and returns some profile data
/*irecarga.validateLoginSenha(function(err, data){
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
// NAO ESQUECER DE DELETAR LOGS E TOKEN
//irecarga.token = 'c35e95ac-d145-4624-91d4-7dd4a3611de9'
irecarga.getValuesforProvider('oi', 48, function(err, data){
    console.log('err: ', err)
    console.log('data', data)
})*/

irecarga.makeRecharge('vivo', 48, 91914321, '5,00', 'ernanirst@gmail.com', function(err, data){
    console.log('err: ', err)
    console.log('data', data)
})