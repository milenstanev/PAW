import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import socket from 'socket.io';

//region Modules
import {
    socketInstance as ioInstance,
    lostAnimalsRouter as api
} from './server/routes/api';
//endregion

let app = express();
let server = http.Server(app);
let io = socket(server);

ioInstance(io);

//region set | use section
app.set('view engine', 'jade');
app.set('views', path.join(__dirname + '/views'));
app.set(express.static(path.join(__dirname, 'app')));
app.use(express.static(__dirname +  '/app'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', api);
//app.use('/api', socket);
//endregion


//region paths
app.get('/', function(req, res){
    res.render('default');
});

app.get('/:viewname', function(req, res){
    res.render(req.params.viewname);
});
//endregion
server.listen('3003');
/*app.listen(app.get('port'), function() {
    //debug('Express server listening on port ' + server.address().port);
    console.log("Server is started at:" + this.address().port);
});*/
