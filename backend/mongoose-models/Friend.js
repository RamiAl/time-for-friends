const mongoose = require('mongoose');
 
const modelName = 'Friend';

const schema = {
    name: {type: 'String', required: true},
    age: Number,
    emailAddress: String,
    phoneNumber: String,
    city: String,
    country: String,
    timeZone: String
};
 
module.exports = mongoose.model(modelName, schema);