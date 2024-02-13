const mongoose=require("mongoose")
const Schema = mongoose.Schema;
const notesSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,        
    },
    tag:{
        type:String,
        default:"General Note"
    },
    date:{
        type:Date,
        default:Date.now
    },
    
});
module.exports=mongoose.model("Notes",notesSchema);