const mongoose = require('mongoose');

var employeeSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true

    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    payRate: {
        type: Number,

    },
    phoneNumber: {
        type: Number,
        required: true

    },
    gender: {
        type: String,
        required: true

    },
    employeeID: {
        type: String,
        required: true,
        unique: true
    },
    accountNumber: {
        type: Number,
        required: true
    }

});

var shiftSchema = mongoose.Schema({
    clockin: {
        type: Date,
        required: true,
    },
    clockout: {
        type: Date
    },
    employeeID: {
        type: String,
        required: true,
    }
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;