const mongoose = require('mongoose');

const leave_schema = new mongoose.Schema({ 
    leaveType: String,
    estimatedLeave: Number
});

module.exports = mongoose.model("officialsLeave", leave_schema);

