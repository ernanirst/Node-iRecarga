const base_uri = 'https://www.irecarga.com.br/api/'
const validateLoginPassword = base_uri + 'ValidateUser.ashx?action=validateLoginSenha'
const reloaderCompanyService = base_uri + 'ReloadCompany.ashx?action=reloaderCompanyService'
const reloaderCompanyValue = base_uri + 'Company.ashx?action=reloaderValueCompany'
const reloaderPhoneValue = base_uri + 'ReloadPhone.ashx?action=reloadPhoneValue'

const post_handler = require('./post_handler')

var _this = module.exports = function(credentials) {
    var methods = {
        token: null,
        /**
         * update token and returns a json object
         * */
        validateLoginSenha: function(callback) {
            post_handler.getJSONHttpPost(validateLoginPassword, 
                {NN_LOGIN: credentials.username, NN_PASSWORD: credentials.password},
                function(err, data){
                    // check connection
                    if(err.status === true){
                        throw 'Could not reach irecarga.com.br'
                    }else{
                        // check credentials
                        if(data.status === false){
                            throw 'Invalid credentials'
                        }else{
                            // store token 
                            methods.token = data.token
                            callback(err, data)
                        }
                    }
                }
            )
        },
        /**
         * returns a list of providers available for a
         * specific DDD
         * */
        getServiceProviders: function(ddd, callback) {
            // check if has token before proceed
            if(methods.token == undefined || methods.token == null){
                // get token
                methods.validateLoginSenha(function(err, data){
                    post_handler.getJSONHttpPost(reloaderCompanyService, 
                        {NN_TOKEN: methods.token, NN_DDD: ddd},
                        callback
                    )
                })
            }else{
                // has token
                post_handler.getJSONHttpPost(reloaderCompanyService, 
                    {NN_TOKEN: methods.token, NN_DDD: ddd},
                    function(err, data){
                        // it doesn't return status if there is no error
                        if(data.hasOwnProperty('status')){
                            // get token and post again
                            methods.validateLoginSenha(function(err, data){
                                post_handler.getJSONHttpPost(reloaderCompanyService, 
                                    {NN_TOKEN: methods.token, NN_DDD: ddd},
                                    callback
                                )
                            })
                        }else{
                            callback(err, data)
                        }
                    }
                )
            }
            
        },
        /**
         * returns a list of value availables for
         * recharge for a pair of DDD and provider
         * */
        getValuesforProvider: function(provider, ddd, callback) {
            // check if has token before proceed
            if(methods.token == undefined || methods.token == null){
                // get token
                methods.validateLoginSenha(function(err, data){
                    post_handler.getJSONHttpPost(reloaderCompanyValue, 
                        {NN_TOKEN: methods.token, NN_COMPANY: provider, NN_DDD: ddd},
                        callback
                    )
                })
            }else{
                // has token
                post_handler.getJSONHttpPost(reloaderCompanyValue, 
                    {NN_TOKEN: methods.token, NN_COMPANY: provider, NN_DDD: ddd},
                    function(err, data){
                        // it doesn't return status if there is no error
                        if(data.hasOwnProperty('status')){
                            // get token and post again
                            methods.validateLoginSenha(function(err, data){
                                post_handler.getJSONHttpPost(reloaderCompanyValue, 
                                    {NN_TOKEN: methods.token, NN_COMPANY: provider, NN_DDD: ddd},
                                    callback
                                )
                            })
                        }else{
                            callback(err, data)
                        }
                    }
                )
            }
        },
        /**
         * make the recharge 
         * */
        makeRecharge: function(provider, ddd, number, value, user, callback) {
            // check if has token before proceed
            if(methods.token == undefined || methods.token == null){
                // get token
                console.log('no token')
                methods.validateLoginSenha(function(err, data){
                    post_handler.getJSONHttpPost(reloaderPhoneValue, 
                        {NN_TOKEN: methods.token, NN_COMPANY: provider, NN_DDD: ddd, NN_PHONENUMBER: number,
                            NN_VALUE: value, NN_OS: user},
                        callback
                    )
                })
            }else{
                console.log('has token')
                // has token
                post_handler.getJSONHttpPost(reloaderPhoneValue, 
                    {NN_TOKEN: methods.token, NN_COMPANY: provider, NN_DDD: ddd, NN_PHONENUMBER: number,
                            NN_VALUE: value, NN_OS: user},
                    function(err, data){
                        // it doesn't return status if there is no error
                            if(data.status=="false"){
                            console.log('old/invalid token')
                            // get token and post again
                            methods.validateLoginSenha(function(err, data){
                                post_handler.getJSONHttpPost(reloaderPhoneValue, 
                                    {NN_TOKEN: methods.token, NN_COMPANY: provider, NN_DDD: ddd, NN_PHONENUMBER: number,
                                        NN_VALUE: value, NN_OS: user},
                                    callback
                                )
                            })
                        }else{
                            console.log('success')
                            callback(err, data)
                        }
                    }
                )
            }
        },
    }

    // checking if credentials are valid
    methods.validateLoginSenha(function(err, data){})
    return methods
}
