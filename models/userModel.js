const mongoose = require('mongoose');//grab your database
const bcrypt = require('bcrypt-nodejs');//creates incription, creates hashes over your password so browser cant see it

var userSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},//could do user name
  password: {type: String, required: true},
  name: String
});

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);//between 6 and 12 for sync...means your password will be hashed over 8 times.  compatre processing time to risk to decide your number
};

userSchema.methods.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);//compares inputted password to the actual password

};


module.exports = mongoose.model("User", userSchema);
