const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");



const projectSchema = new Schema({
  //_id: Schema.Types.ObjectId,
  title:String,
  price: String,
  desc:String,
  photos:[String],
  availability: Boolean,
  user:{
    type:Schema.Types.ObjectId,
    ref:"User",
    _id: Schema.Types.ObjectId
}}, {
    timestamps:{
      createdAt:"created_at",
      updatedAt:"updated_at"

  }
  })



module.exports = mongoose.model('Project', projectSchema)
