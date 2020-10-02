const express = require('express');

const Student = require('../models/studentModel');

/*  This function will give list of all the student available in Student Collection */
exports.getStudent = async(req, res) => {
	try {
		var students = await Student.find();
	} catch (error) {
		return res.json({
			message: error,
			type: 'error',
		})
	}
	if(students){
		return res.status(200).json({
			meassage: 'Fetched all the students data!!',
			type: 'success',
		});
	}else {
		return res.json({
			message: 'Failed to fetch student data!!',
			type: 'error',
		});
	}
}

/*  This function will add a new student as we get name.rollNo and subject in req.body */
exports.addStudent = async(req, res) => {

	var studentAdded = new Student({
		name: req.body.name,
		rollNo: req.body.rollNo,
		subject: req.body.subject,
	});

	try {
		var addedStudent = await studentAdded.save();
	} catch (error) {
		return res.json({
			message: error,
			type: 'error',
		})
	}
	if(addedStudent) {
		return res.status(201).json({
			message: 'Student added successfully',
			type: 'success',
		});
	}else {
		return res.json({
			message: 'Failed to add student',
			type: 'error',
		});
	}
}

/*  This function will updated the documnet of student whose name and rollNo is specifiedin req.body */
exports.updateStudent = (req, res) => {
	const { name, rollNo, subject } = req.body;

	try {
		var updatedStudent = await Student.findOneAndUpdate(
			{ name: name, rollNo: rollNo },
			{ $set: { subject: subject } }
		);
	} catch (error) {
		return res.json({
			message: error,
			type: 'error',
		})
	}

	if(updatedStudent) {
		return res.status(201).json({
			message: 'Data has been updated!!',
			type: 'success',
		});
	}else {
		return res.json({
			message: 'Failed to fetch student data!!',
			type: 'error',
		});
	}
}

/*  This function will delete the student data whose rollNo is specifiedin req.body */
exports.deleteStudent = async (req, res) => {
	const rollNo = req.body.rollNo;

	try {
		var deletedStudent = await deleteOne({ rollNo: rollNo });
	} catch (error) {
		return res.json({
			message: error,
			type: 'error',
		})
	}
	if(deletedStudent){
		return res.status(201).json({
			message: 'Student successfully deleted',
			type: 'success',
		});
	}else {
		res.json({
			message: 'Failed to delete student',
			type: 'error',
		});
	}
}
