const LocalStrategy = require('passport-local').Strategy;//part of passport package that takes care of behind the scene processes
const UserModel = require('./../models/userModel.js');


module.exports = function(passport){
  passport.serializeUser(function(user, done){
    console.log("USER", user);
    done(null, user.id);//done is a build in if/then
  });//creates log of user, serializes.  essentially, passport stores information regarding this user object.  stores in session, login id.
  passport.deserializeUser(function(id, done){
    console.log("ID", id);
    UserModel.findById(id, function(err, user){
      done(err, user);
    })
  });//deSerialize the user object after it has been serialized. unpacks it into a language and values that passport understands.
  passport.use('local-signup', new LocalStrategy({//localstrategy is your variable defined up top. part of passport.
    usernameField: 'email', //if you wanted to use username, change it here to username. your usermodel and callback function are currently set up with email.
    passwordField: 'password',
    passReqToCallback: true//so we only need one callback function below.  just trust us.
  }, function(req, email, password, done){//argument 3 of first function
    process.nextTick(function(){//waits til all other code has been completed(isn't that what js does...?)
      UserModel.findOne({'email': email}, function(err, user){
        if (err) {
          return done(err);
        }if(user){//if there is a user> go to next if.
          if(user.validPassword(password)){//then, if pw correct>
            console.log("pw correct");
            return done(null, user);//login.  ELSE...
          }else {
            console.log("password incorrect");
            return done(null, false);//your user has been established up top.  > if pw incorrect
          }
        } else {
          var newUser = new UserModel(req.body);
          newUser.email = email;
          newUser.password = newUser.generateHash(password);//the hash is what stores in your database so only the program can dehash
          newUser.save(function(err){
            if(err) throw err;
            else return done(null, newUser);
          });
        }//back to top...if there is NO valid user, create new account here.
      });
    });
  }));
};
