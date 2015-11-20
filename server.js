var express = require('./express');
var app = express();
var db = require('./mongoose');

app.use(function(req, res, next) {
	console.log('%s %s', req.method, req.url);
	next();
});

//see clients.server.routes.js. It's using app.param(value, clients.clientById -> this is a function in clients.server.controller.js that is finding the id. I think it's returning it to whatever is next, after the param.thing)
//see line 48 for another example of this kinda thing 
app.param('user_id', function(req, res, next, user_id) {
	// typically we might sanity check that user_id is of the right format
	UserDatabase.find(user_id, function(err, user) {
		if (err) return next(err);
		if (!user) return next('...create a 404 error...');
 
		req.user = user;
		next()
	});
});

app.get('/', function(req, res, next) {
	res.send('Hello World!');
});
 
app.get('/help', function(req, res, next) {
	res.send('Nope.. nothing to see here');
});

app.use('/users', function(req, res, next) {
	// req.path will be the req.url with the /users prefix stripped
	console.log('%s', req.path);
	next();
});

app.get('/users/daily', function(req, res, next) {
	res.send('So, what have we learned here?');
	//this did what was in the section on line 17, then 'next' to this section.
	//I could use the req.path thing to get the value clientcontext...doesn't sound safe, but I could be making that up...
	//to do this, I would need to call req.path...where?
});

app.get('/users/phred', function(req, res, next) {
	res.send('So, Phred was here...');
});

app.get('/users/:user_id/profile_url', function(req, res, next) {
	// gets the value for the named parameter user_id from the url
	var user_id = req.params.user_id;
	console.log(user_id);
 	next();
	// lookup the user in the db so we can get their profile url
/*	UserDatabase.find(user_id, function(err, user) {
		if (err) return next(err);
		if (!user) return next(...create a 404 error...);
 
		res.json('cdn.example.com/' + user.profile_url);
	});*/
});

//couldn't get this to work because of db.load - not sure why the error handling didn't work though...
app.get('/catpic', function(req, res, next) {
	db.load('my-catpic', function(err, pic) {
		if (err) {
			return next(err);
		}
 
		if (!pic) {
			var notFound = new Error('no such catpic');
			notFound.status = 404;
			return next(notFound);
		}
 
		res.send(pic);
	});
});

//this has to be after all the other routes
app.get('*', function(req, res, next) {
	var err = new Error();
	err.status = 404;
	next(err);
});
 
// handling 404 errors
app.use(function(err, req, res, next) {
	if(err.status !== 404) {
		return next();
	}
	res.send(err.message || '** no unicorns here **');
});

app.use(function(err, req, res, next) {
	// log the error, treat it like a 500 internal server error
	// maybe also log the request so you have more debug information
	//log.error(err, req);
 
	// during development you may want to print the errors to your console
	//console.log(err.stack);
 
	// send back a 500 with a generic message
	res.status(500);
	res.send('oops! something broke');
});

app.listen(3000);

console.log("Server is funning. Yeah...");

module.exports = app;
