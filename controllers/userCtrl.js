const userModel = require('./../models/userModel.js');

module.exports = {
  login: function(req, res){
    res.send();//just send back the response
  },
  logout: function(req, res){
    req.logout();// ends session
    console.log(" user has been logged out");
    res.send();
  },
  getMe: function(req, res){
    if(!req.user){
      return res.send();
    }
    userModel.findById(req.user._id)//query by Id, find current user
    .exec(function(err, result){
      if(err){
        res.send(err);
      }else {
        res.send(result);
      }
    })
  }
};
