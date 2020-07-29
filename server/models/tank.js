const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tankSchema = new Schema({
    model: String,
    className: String,
    nation: String,
    workerId: String,
});

module.exports = mongoose.model('Tank', tankSchema);