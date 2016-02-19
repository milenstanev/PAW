import express from 'express';
import path from 'path';

//region Modules
import api from './server/routes/api';
//endregion

var app = express();

//region set | use section
app.set('view engine', 'jade');
app.set('views', path.join(__dirname + '/views'));
app.set(express.static(path.join(__dirname, 'app')));

app.use(express.static(__dirname +  '/app'));
//endregion

//api(app);
app.use('/api', api);


//region paths
app.get('/', function(req, res){
    res.render('default');
});

app.get('/:viewname', function(req, res){
    res.render(req.params.viewname);
});
//endregion

app.listen('3003');
/*app.listen(app.get('port'), function() {
    //debug('Express server listening on port ' + server.address().port);
    console.log("Server is started at:" + this.address().port);
});*/
