let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let peopleModelSchema = new Schema({

  id: Number,
  name:String,
  email: String,
  phone: Number,
  time_thue: Number,
  time_start: String,
  time_end: String,
  room:Number,
  key: String
},{
   collection: 'people'
})
module.exports = mongoose.model('people', peopleModelSchema);
