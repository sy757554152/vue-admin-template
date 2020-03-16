const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const commentSchema=new Schema({
    commentId:Schema.Types.ObjectId,
    title:String,
    commentNumber:String,//评价学生学号
    commentName:String,//评价学生姓名
    studentNumber:String,//被评价学生学号
    studentName:String,//被评价学生姓名
    teacherflag:Boolean,
    homeworkId:String,
    state:Number,
    institute:String,
    major:String,
    class:String,
    address:String,
    flag:Boolean,
    commentcontent:Array,//评价内容
    commentscore:Array,//评价分数
    teacherscore:String,
    teachercontent:String,
    time:Number,//总时间
    frequency:Number,//总次数
    createDate:{type:Date,default:Date.now()},
})
mongoose.model('Comment',commentSchema);