let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserModelSchema = new Schema({
  id: Number,
  month:Number,
  year: Number,
  room:Number,
  people:String,
  electricity_bill:Number,
  water_bill:Number,
  room_bill:Number,
  total:Number,
  status:String
},{
   collection: 'money'
})
module.exports = mongoose.model('money', moneyModelSchema);
