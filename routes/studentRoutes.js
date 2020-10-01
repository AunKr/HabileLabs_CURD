const express = require('express');
const router = express.Router();

const authCheck = require('../middlewares/authCheck');
const studentController = require('../controllers/studentController');

//Get request --> to get all the student in Student Collection
router.get('/getStudents', authCheck, studentController.getStudent);

//Post request --> to add a studentin Student Collection
router.post('/addStudent', authCheck, studentController.addStudent);

//Patch request --> to update a studentin Student Collection
router.patch('/updateStudent', authCheck, studentController.updateStudent);

//Delete request --> to delete a studentin Student Collection
router.delete('/deleteStudent', authCheck, studentController.deleteStudent);
