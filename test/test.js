var irecarga = require('../')({
    username: process.env.IRECARGA_USERNAME,
    password: process.env.IRECARGA_PASSWORD
})

irecarga.validateLoginSenha(function(err, data){
    console.log('err: ', err)
    console.log('data', data)
    console.log('token', irecarga.token)
})

