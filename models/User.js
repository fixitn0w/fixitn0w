const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
name:String,
lastname:String,
username:{
      type:String,
      required:true
},
profilePhoto:String,
bio:String,
city:String,
projects:[{
  type:Schema.Types.ObjectId,
  ref:"Project"
}],
street:String,
postalCode:Number,
coord:[Number],
    role:{
          type:String,
          enum:["CLIENT", "WORKER"],
          default:"CLIENT"
        }
},
{
    timestamps:{
          createdAt:"created_at",
          updatedAt:"updated_at"
        }
});

userSchema.plugin(PassportLocalMongoose, {nameField:"username"})
module.exports = mongoose.model('User', userSchema)
