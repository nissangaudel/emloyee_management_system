const mongoose = require('mongoose');
var shiftSchema = mongoose.Schema({
    clockin: {
        type: Date,
        default: Date.now
    },
    clockout: {
        type: Date,
    },
    employeeID: {
        type: String,
    },
    isIn: {
        type: Boolean,
        default: false,
    },
    isOut: {
        type: Boolean,
        default: false,
    }
});

const Shift = mongoose.model('Shift', shiftSchema);
module.exports = Shift;