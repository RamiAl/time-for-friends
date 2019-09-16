const mongoose = require('mongoose');
const modelName = 'Person';

const schema = {
    
    first_name: String
}
module.exports = mongoose.model(modelName, schema);