const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const dbConfig = require('./config/db.config');

const app = express();

/* This is MongoDB url  */
const dbUrl = `mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`;

mongoose
	.connect(dbUrl, { useNewUrlParser: true })
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((err) => {
		console.error('Failed to connect to MongoDB', err);
	});

// parse requests of content-type - application/json
pp.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// For cross-platform allowing origin,headers,method -> CORS Policy
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS, PUT'
	);
	next();
});

// Routes
app.use(authRoutes);
app.use(studentRoutes);

// Set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});
