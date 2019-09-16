const mongoose = require('mongoose');
 
const modelName = 'Friend';

const schema = {
    firstName: {type: 'String', required: true},
    lastName: {type: 'String', required: true},
    emailAddress: [],
    phoneNumber: [],
    city: String,
    country: String,
    timeZone: String
};
 
module.exports = mongoose.model(modelName, schema);