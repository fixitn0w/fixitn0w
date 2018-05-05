const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PassportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
name:String,
lastname:String,
    email:{
          type:String,
          required:true
},
profilePhoto:String,
bio:String,
    address:{
          city:String,
          street:String,
          postalCode:Number,
          coord:[Number]
        },
    role:{
          type:String,
          enum:["CLIENT", "WORKER"],
          default:"CLIENT"
        }
},
,{
    timestamps:{
          createdAt:"created_at",
          updatedAt:"updated_at"
        }
});


userSchema.plugin(PassportLocalMongoose, {nameField:"email"})
module.exports = mongoose.model('User', userSchema)
