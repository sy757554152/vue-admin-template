const mongoose =require('mongoose');
const Schema=mongoose.Schema;
// const bcrypt=require('bcryptjs');
const homeworkTeacherSchema=new Schema({
    homeworkId:Schema.Types.ObjectId,
    title:String,
    claim:Array,
    answer:String,
    teacherNumber:String,
    teacherName:String,
    score:Array,
    state:Number,
    institute:String,
    major:String,
    class:String,
    createDate:{type:Date,default:Date.now()},
})
mongoose.model('HomeworkTeacher',homeworkTeacherSchema);