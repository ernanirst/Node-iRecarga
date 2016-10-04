const base_uri = 'https://www.irecarga.com.br/api/ValidateUser.ashx?action='
const validateLoginPassword = base_uri + 'validateLoginSenha'

var post_handler = require('./post_handler')

var _this = module.exports = function(credentials) {
    var methods = {
        token: null,
        validateLoginSenha: function(callback) {
            post_handler.getJSONHttpPost(validateLoginPassword, 
                {NN_LOGIN: credentials.username, NN_PASSWORD: credentials.password},
                function(err, data){
                    methods.token = data.token
                    callback(err, data)
                }
            )
        }
    }

    // checking if credentials are valid
    methods.validateLoginSenha(function(err, data){
        if(err.status === true){
            throw 'Could not reach irecarga.com.br'
        }else{
            if(data.status === false){
                throw 'Invalid credentials'
            }/*else{
                methods.token = data.token
            }*/
        }
    })
    return methods
}