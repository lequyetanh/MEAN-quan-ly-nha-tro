let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let roomModelSchema = new Schema({

  id: Number,
  room:Number,
  price: Number,
  status:String,
  user: String,
},{
   collection: 'room'
})
module.exports = mongoose.model('room', roomModelSchema);
