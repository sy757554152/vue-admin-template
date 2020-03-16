const mongoose =require('mongoose');
const Schema=mongoose.Schema;

//创建模型
const instituteSchema=new Schema({
    // instituteId:Schema.Types.ObjectId,
    label:String,
    value:String,
    children:Object,
    // createDate:{type:Date,default:Date.now()}
})
//发布模型
mongoose.model('Institute',instituteSchema);