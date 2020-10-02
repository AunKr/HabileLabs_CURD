const express = require('express');

const Student = require('../models/studentModel');



/*  This function will give list of all the student available in Student Collection */
exports.getStudent = (req,res) => {
    Student.find()
    .then(res => {
        res.status(200).json({
            meassage: 'Fetched all the students data!!!',
            type: 'success'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            message:'Failed to fetch student data!!!',
            type: 'error'
        })
    })
}


/*  This function will add a new student as we get name.rollNo and subject in req.body */
exports.addStudent = (req,res) => {
    const studentAdded = new Student({
        name: req.body.name, 
        rollNo: req.body.rollNo, 
        subject: req.body.subject
    });
    studentAdded.save() 
    .then(res => {
        res.status(201).json({
            message: 'Student added successfully',
            type: 'success'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            message:'Failed to add student',
            type: 'error'
        })
    })
}


/*  This function will updated the documnet of student whose name and rollNo is specifiedin req.body */
exports.updateStudent = (req,res) => {
    const { name, rollNo} = req.body;

    Student.findByIdAndUpdate({name: name, rollNo: rollNo}, { $set: {subject: subject}})
    .then(res => {
        res.status(201).json({
            message: 'Data has been updated!!',
            type: 'success'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            message:'Failed to fetch student data!!!',
            type: 'error'
        })
    });
} 


/*  This function will delete the student data whose rollNo is specifiedin req.body */
exports.deleteStudent = (req,res) => {
    const rollNo = req.body.rollNo;

    Student.deleteOne({rollNo: rollNo})
    .then(res => {
        res.status(201).json({
            message:'Student successfully deleted',
            type: 'success'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            message:'Failed to delete student',
            type: 'error'
        })
    });
}