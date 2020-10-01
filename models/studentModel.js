const mongoose = require('mongoose');

//Defining the Stident Schema
const studentSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    rollNo: {
        type: String,
        unique: true
    },
    subject: {
        type: String,
        required: true
    },
});


module.exports = mongoose.model('Student', studentSchema);