const Koa=require('koa');
const Router=require('koa-router');
let router=new Router();
const mongoose=require('mongoose');
const fs=require('fs');
router.get('/innerInstitute',async(ctx)=>{
    fs.readFile('./data/institute.json','utf8',(err,data)=>{
        data=JSON.parse(data);
        console.log(data);
        let count=0;//计数器
        const Institute=mongoose.model('Institute');
        data.map((value,index)=>{
            console.log(value);
            let institute= new Institute(value);
            institute.save().then(()=>{
                count++;
                console.log('成功'+count);
            }).catch((err)=>{
                console.error(err);
            });
        })
    })
    ctx.body='导入数据';
})
router.get('/getInstitute',async(ctx)=>{
    const Institute=mongoose.model('Institute');
    await Institute.find({}).exec().then(res=>{
        ctx.body={
            code: 20000,
            data: res
        }
    }).catch(err=>{
        console.log(err);
        ctx.body=err;
    })
})
module.exports =router;