const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const secret = require('../config/auth.config');

/*This funtion will be called when user will register itself in our application */
exports.singUp = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;
	try {
		var user = await User.findOne({ email: email });
	} catch (error) {
		return res.json({
			message: error,
			type: 'error',
		});
	}
	//This will check that user is Registered User or not
	if (user) {
		return res.json({
			message: 'Already registered with this email id!!',
			type: 'error',
		});
	} else {
		let hashedpassword = await bcrypt.hash(password, 12);

		if (hashedpassword) {
			const user = new User({
				userName: req.body.name,
				mobile: req.body.mobile,
				email: req.body.email,
				password: hashedpassword,
				dob: req.body.dob,
				doj: req.body.doj,
			});

			try {
				var userRegistered = await user.save();
			} catch (error) {
				return res.json({
					message: error,
					type: 'error',
				});
			}
			if (userRegistered) {
				return res.status(201).json({
					message: 'Registration Successful!!',
					type: 'success',
				});
			}
		}
	}
};

/* This funtion will be called once the user will click on the sign in button */
exports.singIn = async (req, res, next) => {
	const email = req.body.userName;
	const password = req.body.password;

	try {
		var user = await User.findOne({ email: email });
	} catch (error) {
		return res.send(500).json({
			message: error,
			type: 'error',
		});
	}

	if (user) {
		let passwordMatched = await bcrypt.compare(password, user.password);

		if (passwordMatched) {
			const token = jwt.sign(
				{
					email: user.email,
				},
				'my_secret_sports_basketball',
				{ expiresIn: 3600 }
			);
			return res.json({
				message: 'LoggIn Successful!!',
				type: 'success',
				token: token,
				expiresIn: 3600,
				userData: user,
			});
		} else {
			return res.json({
				message: 'Please enter correct password!!',
				type: 'error',
			});
		}
	} else {
		return res.json({
			message: 'Incorrect User Name!!',
			type: 'error',
		});
	}
};
