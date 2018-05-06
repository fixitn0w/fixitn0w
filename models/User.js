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
profilePhoto:{
  type:String,
  default:"https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/1024px-Missing_avatar.svg.png"
},
bio:String,
city:String,
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
