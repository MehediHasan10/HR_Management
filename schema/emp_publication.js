const mongoose = require('mongoose');

const publication_Schema = new mongoose.Schema({
    //employee publication
    type: String,
    date: Date,
    description: String,
});

var emp_publication = mongoose.model('emp_publication', publication_Schema);
mongoose.exports = emp_publication;
