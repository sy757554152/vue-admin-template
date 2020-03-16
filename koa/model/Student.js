const mongoose =require('mongoose');
const Schema=mongoose.Schema;
const bcrypt=require('bcryptjs');
//创建模型
const studentSchema=new Schema({
    studentId:Schema.Types.ObjectId,
    studentName:String,
    studentNumber:{unique:true,type:String},
    IdCard:{unique:true,type:String},
    sex:String,
    state:Number,
    phone:String,
    political:String,
    password:String,
    institute:String,
    major:String,
    class:String,
    type:String,
    createDate:{type:Date,default:Date.now()}
})
studentSchema.pre('save',function(next){
    // 随机生成salt 10次迭代
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){
            return next(err);
        }
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err){
                return next(err);
            }
            this.password=hash;
            next();
        })
        
    })
})
studentSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err){
                    resolve(isMatch);
                }else{
                    reject(err);
                }
            })
        })
    }
}
//发布模型
mongoose.model('Student',studentSchema);