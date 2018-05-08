const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");



const projectSchema = new Schema({
  title:String,
  price: String,
  desc:String,
  photos:[String],
  availability: Boolean,
  user:{
    type:Schema.Types,
    ref:"User"
}  }, {
    timestamps:{
      createdAt:"created_at",
      updatedAt:"updated_at"

  }
  })



module.exports = mongoose.model('Project', projectSchema)
