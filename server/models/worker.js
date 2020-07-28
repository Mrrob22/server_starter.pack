const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workerSchema = new Schema({
    firstName: String,
    secondName: String,
    lastName: String,
});

module.exports = mongoose.model('Worker', workerSchema);