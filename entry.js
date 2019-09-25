
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;

var entrySchema = new Schema({
    name: {type: String, required: true},
    amount: Number
});
//because working with already populated collection we must specify the collection name when creating the model
var entry = mongoose.model('Workout', entrySchema,'Workout'); 

module.exports = entry;
