let jwt = require('jsonwebtoken');
const config = require('./config.js');
const mongoose = require('mongoose')
var User = mongoose.model('users')

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  
  if (token) {

    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        User.findOne({_id:decoded.id},(err,user)=>{
            if(err) return res.json({
                success: false,
                message: 'Some error occurred !'
              });
              else if(!user){
                return res.json({
                    success: false,
                    message: 'Not a valid user !'
                  });
              }
              else{
                  req.user = user
                  next();
              }
        })
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkToken: checkToken
}