// Invoke 'strict' JavaScript mode
'use strict';

// Set the 'development' environment configuration object
module.exports = {
	db: 'mongodb://localhost/support',
	sessionSecret: 'developmentSessionSecret',
	facebook: {
		clientID: '492481720796244',
		clientSecret: 'fd0a4531d0e8597c0d0cfdd5ddc4ae33',
		callbackURL: 'http://localhost:3000/oauth/facebook/callback'
	},
	twitter: {
		clientID: 'Twitter Application ID',
		clientSecret: 'Twitter Application Secret',
		callbackURL: 'http://localhost:3000/oauth/twitter/callback'
	},
	google: {
		clientID: 'Google Application ID',
		clientSecret: 'Google Application Secret',
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	}
};