const mongoose = require('mongoose');
 
const modelName = 'Friend';

const schema = {
    firstName: String,
    lastName: String,
    emailAddresses: [],
    phoneNumbers: [],
    city: String,
    country: String,
    timeZone: String
};
 
module.exports = mongoose.model(modelName, schema);