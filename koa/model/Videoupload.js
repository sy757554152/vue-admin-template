const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const videouploadSchema=new Schema({
    videoId:Schema.Types.ObjectId,
    studentNumber:String,
    studentName:String,
    teacherName:String,
    teacherNumber:String,
    homeworkId:String,
    state:Number,
    institute:String,
    major:String,
    class:String,
    address:String,
    // file:Buffer,
    flag:Boolean,
    createDate:{type:Date,default:Date.now()},
})
mongoose.model('Videoupload',videouploadSchema);