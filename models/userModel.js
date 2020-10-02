const mongoose = require('mongoose');

// Defining the User Schema
const userSchema = mongoose.Schema({
	username: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('User', userSchema);
