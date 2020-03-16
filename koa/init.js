const mongoose=require('mongoose');
const db="mongodb://localhost/graduationproject";

//引入schema
const glob=require('glob');
const path=require('path');
exports.initSchemas=()=>{
    glob.sync(path.resolve(__dirname,'./model','*js')).forEach(require);
};

exports.connect=()=>{
    // 连接数据库
    mongoose.connect(db,{userNewUrlParser: true});
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db);
    });
    // 数据库出现错误
    mongoose.connection.on('error',err=>{
        console.log(err);
        mongoose.connect(db);
    })
    // 连接时
    mongoose.connection.once('open',()=>{
        console.log('mongodb success');
    })
}