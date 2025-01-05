const { default: mongoose } = require("mongoose");

const todoSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    creator:{
        type:String
    },
    day:{
        type:String
    },
    month:{
        type:String
    },
    year:{
        type:String
    }
})

const Todo=mongoose.model("Todo",todoSchema);
module.exports=Todo
