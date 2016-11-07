const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');//const is like var, but you can't change a const
const bodyParser = require('body-parser');
const session = require('express-session');//auth packages
const passport = require('passport');//these are your auth packages

const carsCtrl = require('./controllers/carsCtrl');
const userCtrl = require('./controllers/userCtrl');
const config = require('./config/config');//passport/local auth secret

const app = express();

require('./config/passport.js')(passport);//auto invoking the file where our passport stuff (localauth) goes

app.use(session(config));//local auth set up session. your secret is in your config file.
app.use(passport.initialize());//more auth setup - initialize passport package
app.use(passport.session());//link passport with a session
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(express.static(__dirname + '/public'));

app.post('/login', passport.authenticate("local-signup"), userCtrl.login);//logs you in
app.get('/logout', userCtrl.logout);//logs you out
app.get('/current', userCtrl.getMe);//user profile

app.get('/cars', carsCtrl.read);
app.post('/cars', carsCtrl.create);
app.put('/cars/:id', carsCtrl.update);
app.delete('/cars/:id', carsCtrl.destroyer);

mongoose.connect("mongodb://localhost:27017/carsDB");
mongoose.connection.once('open', function(){
  console.log("mongoose connected");
});

app.listen(7000, function(){
  console.log("7000");
});
