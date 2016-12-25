import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import socket from 'socket.io';

import passport from 'passport';
import session from 'express-session';

import googleStrategy from 'passport-google-oauth';

passport.use(new googleStrategy.OAuth2Strategy({
        clientID: '958959142043-r3cvcoois8dsns52mqdi11j2pnk4fqjv.apps.googleusercontent.com',
        clientSecret: 'ScfgAoeXc60sPOdA7S4cBH7X',
        callbackURL: 'http://localhost:3003/auth/google/callback'
    },
    function(req, accessToken, refreshToken, profile, done) {
        done(null, profile);
    }
));

//region Modules
import api from './server/routes/api';
import socketInstance from './server/sockets/socket';
import auth from './server/auth/routes.js';
//endregion

let app = express();
let server = http.Server(app);
let io = socket(server);
socketInstance(io);


//region set | use section
app.set('view engine', 'jade');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(__dirname +  '/app'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);
//app.use('/api', socket);
//endregion

//region passport integration
app.use(session({
    genid: function(req) {
        //console.log(req)
        //return genuuid() // use UUIDs for session IDs
    },
    resave: false,
    saveUninitialized: true,
    secret: 'keyboard cat'
}));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('SSSS:', user);
    done(null, user);
});

passport.deserializeUser(function(id, done) {
    console.log(user);
    done(null, user);
    /*User.findById(id, function(err, user) {
        done(err, user);
    });*/
});

app.use('/auth', auth);
//endregion



//region paths
app.get('/', function(req, res) {
    console.log(req.user);
    res.render('default');
});

app.get('/:viewname', function(req, res) {
    res.render(req.params.viewname, {user: res.user});
    //res.render(req.params.viewname);
});
//endregion


server.listen('3000');
/*app.listen(app.get('port'), function() {
    //debug('Express server listening on port ' + server.address().port);
    console.log("Server is started at:" + this.address().port);
});*/
