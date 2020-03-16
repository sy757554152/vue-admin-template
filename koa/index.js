const Koa=require('koa');
const app=new Koa();



const koaBody = require('koa-body');
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 1024*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));


//解决跨域
const cors =require('koa2-cors');
app.use(cors({
    origin:['http://localhost:9528'],
    credentials:true
}));

// 接受前端请求
const bodyParser=require('koa-bodyparser');
app.use(bodyParser());

//加载路由
const Router=require('koa-router');
let student =require('./controller/student');
let institute =require('./controller/institute');
let teacher=require('./controller/teacher')
let admin=require('./controller/admin')
let homeworkTeacher=require('./controller/homeworkTeacher')
let viewhomework=require('./controller/viewhomework')
let videoupload=require('./controller/videoupload')
let comment = require('./controller/commet')
let teachercomment = require('./controller/teachercomment')
let studentview = require('./controller/studentview')
let echarts = require('./controller/echarts')
let router=new Router();
router.use('/student',student.routes());
router.use('/institute',institute.routes());
router.use('/admin',admin.routes());
router.use('/teacher',teacher.routes());
router.use('/homeworkTeacher',homeworkTeacher.routes());
router.use('/viewhomework',viewhomework.routes());
router.use('/dev-api',videoupload.routes());
router.use('/comment',comment.routes());
router.use('/teachercomment',teachercomment.routes());
router.use('/studentview',studentview.routes());
router.use('/echarts',echarts.routes());
app.use(router.routes());
//限制只能接受post或get请求
app.use(router.allowedMethods());

//引入init文件 连接数据库
const {connect,initSchemas}=require('./init');
(async()=>{
    await connect(); 
    initSchemas();
})();

app.use(async (ctx)=>{
    ctx.body = "graduation-final-project-koa";
})
app.listen(3000,()=>{
    console.log('start 3000 graduation-final-project-koa')
})