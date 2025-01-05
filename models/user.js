const { default: mongoose } = require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String
    }
})

const User=mongoose.model("User",userSchema);
module.exports=User
