const Router=require('koa-router');
let router=new Router();
const mongoose=require('mongoose');
const path=require('path')
// const multer = require('@koa/multer');
// const upload = multer();
const fs=require('fs');
router.post('/viewhomework/addViedo',async(ctx)=>{
    // const video = new Image(ctx.request.body.video);
    // console.log(ctx.request.files.file);
    // const file = ctx.request.files.file;
    // fs.writeFile('1.jpg',file,'utf-8', (err) => {
    //     if (err) throw err;
    //     console.log('文件已被保存');
    // });

    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    // console.log(typeof(file))
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../video') + `/${file.name}`;
    // console.log(filePath)
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    var videodata = ctx.request.body;
    videodata.address = filePath
    // videodata.file = file
    // console.log(upStream)
    // console.log(videodata)
    const Videoupload = mongoose.model('Videoupload');
    let videoupload = new Videoupload(videodata)
    await videoupload.save().then(res => {
        if (res) {
            ctx.body = {
                code: 20000,
                message: '上传成功'
            }
        } else {
            ctx.body = {
                code: 50000,
                message: '上传失败'
            }
        }
        
    })
})
module.exports=router;