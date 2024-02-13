const mongoose=require('mongoose');
const mongouri="mongodb://localhost:27017/inotebook"
const connectToMongoose = async() =>{
    mongoose.connect(mongouri)
    console.log("Connected")
}
module.exports= connectToMongoose;