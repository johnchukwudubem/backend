import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },
    username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      address: {
       street:{
          type:String
       },
       suite:{
        type:String
     },
     city:{
        type:String
     },
     zipcode:{
        type:String
     },
     geo:{
        lat:{
            type:String
        },
        lng:{
            type:String
        }
     }
      },
      
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user", userSchema);
