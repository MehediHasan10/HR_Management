const mongoose = require('mongoose');

const leaveCount_schema = new mongoose.Schema({
    employee:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'officialsInfo'
    },
    leaveType:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'officialsLeave'
    },
    startDate: Date,
    endDate: Date,
    duration: Number
});

module.exports = mongoose.model('leaveCount', leaveCount_schema);