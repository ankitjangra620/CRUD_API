import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    registerdDate:{
        type:Date,
        required:true,
        default:Date.now()
    }
})

 export default mongoose.model("users",userSchema)