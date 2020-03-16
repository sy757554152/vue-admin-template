const Router=require('koa-router');
let router =new Router();
const mongoose=require('mongoose');

router.get('/show',async(ctx)=>{
    const HomeworkTeacher = mongoose.model('HomeworkTeacher')
    const state = ctx.query.state;
    const institute = ctx.query.institute;
    const major = ctx.query.major;
    const classes = ctx.query.class;
    // const HomeworkTeacher =mongoose.model('HomeworkTeacher');
    await HomeworkTeacher.find({state:state,institute:institute,major:major,class:classes}).exec().then(res=>{
        if(res){
            ctx.body={
                code: 20000,
                message: 'success',
                data: res
            }
        }else{
            ctx.body={
                code: 50000,
                message: 'not found'
            }
        }
    }).catch(err => {
        ctx.body={
            code: 50000,
            message: 'error',
            data: err
        }
    })
})
router.post('/addVideo',async(ctx)=>{
    console.log(ctx.request.body);
    ctx.body={
        code: 20000,
        data: 'cccccccccc'
    }
})
module.exports=router