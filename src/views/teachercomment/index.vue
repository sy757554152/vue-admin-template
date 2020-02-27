<template>
  <div class="app-container">
    <el-table :data="tableData" border v-show="tableShow">
      <el-table-column prop="_id" label="作业ID" width="120"></el-table-column>
      <el-table-column prop="title" label="作业名称" width="100"></el-table-column>
      <el-table-column prop="teacherNumber" label="教师工号" width="80"></el-table-column>
      <el-table-column prop="teacherName" label="教师姓名" width="80"></el-table-column>
      <el-table-column prop="state" label="年级" width="100"></el-table-column>
      <el-table-column prop="institute" label="学院" width="160"></el-table-column>
      <el-table-column prop="major" label="专业" width="160"></el-table-column>
      <el-table-column prop="class" label="班级" width="80"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="160"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleShow(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="(!tableShow)&&(homeworkShow)">
      <div class="homework-return">
        <el-link type="primary" icon="el-icon-arrow-left" :underline="false" @click="tableShow=!tableShow">返回</el-link>
        <span>作业详情</span>
      </div>
      <el-table :data="homeworkData" border>
        <el-table-column prop="homeworkId" label="作业ID" width="80"></el-table-column>
        <el-table-column prop="commentNumber" label="评价学生学号" width="100"></el-table-column>
        <el-table-column prop="commentName" label="评价学生姓名" width="100"></el-table-column>
        <el-table-column prop="studentNumber" label="被评价学生学号" width="100"></el-table-column>
        <el-table-column prop="studentName" label="被评价学生姓名" width="100"></el-table-column>
        <el-table-column prop="tf" label="老师是否评价" width="80"></el-table-column>
        <el-table-column prop="state" label="年级" width="80"></el-table-column>
        <el-table-column prop="institute" label="学院" width="160"></el-table-column>
        <el-table-column prop="major" label="专业" width="100"></el-table-column>
        <el-table-column prop="class" label="班级" width="80"></el-table-column>
        <el-table-column prop="time" label="评价所用总时间" width="80"></el-table-column>
        <el-table-column prop="frequency" label="评价次数" width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="teacherCommentShow(scope.$index, scope.row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="teacher-comment" v-show="!homeworkShow">
      <div class="homework-return">
        <el-link type="primary" icon="el-icon-arrow-left" :underline="false" @click="tableShow=!tableShow">返回</el-link>
        <span>学生评价详情</span>
      </div>
      <div class="video-comment-left">
        <video src="https://vdept.bdstatic.com/444363756b31535377664c466e417756/7a51585572756a50/28f62a2c7876ea25d8bc046185f7e5bc5af83a8dfb309dab34fecba02a8edbc5e27be6959fd4cce2fbacfa6c5f6c33e7.mp4?auth_key=1582436595-0-0-fda779cab6a904dfa2e840bd87672776" controls width="100%" height="624"></video>
      </div>
      <div class="video-comment-right">
        <el-table :data="commentTableData" border >
          <el-table-column prop="claim" label="作业要求" width="180"></el-table-column>
          <el-table-column prop="sc" label="评分标准" width="180"></el-table-column>
          <el-table-column prop="content" label="学生评价" width="180"></el-table-column>
          <el-table-column prop="score" label="分数"></el-table-column>
        </el-table>
        <el-form class="comment-form" ref="form" :model="commentForm" label-width="80px">
          <el-form-item class="comment-form-item" label="教师评分">
            <el-rate class="rate" v-model="commentForm.teacherscore"></el-rate>
          </el-form-item>
          <el-form-item class="comment-form-item" label="详细评述">
            <el-input type="textarea" :rows="2" placeholder="请输入评述内容" v-model="commentForm.teachercontent"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changecomment()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import { getStudentHomework, getTeacherComment, changeTeacherComment } from '@/api/teachercomment'
  import { mapGetters } from 'vuex'
  export default {
    data(){
      return {
        homeworkData: [],
        tableIndex: '',
        tableData: [],
        tableShow: true,
        homeworkId: '',
        homeworkShow: true,
        nowComment: {},
        homeworkTitle: '',
        commentTableData: [],
        commentForm: {
          commentId: '',
          teachercontent: '',
          teacherscore: 0,
          flag: true
        }
      }
    },
    methods:{
      open1() {
        this.$notify({
          title: '成功',
          message: '提交成功',
          type: 'success'
        })
      },
      changecomment() {
        changeTeacherComment(this.commentForm).then(res => {
          if(res){
            this.open1()
            this.handleShow(this.tableIndex, this.tableData[this.tableIndex])
            setTimeout(() => {
              this.homeworkShow = true
            },2000)
          }
        })
      },
      teacherCommentShow(index, row) {
        this.nowComment = this.homeworkData[index]
        this.commentForm.teachercontent = this.nowComment.teachercontent
        this.commentForm.teacherscore = this.nowComment.teacherscore*1
        this.commentForm.commentId = this.nowComment._id
        this.commentTableData = []
        console.log(this.nowComment)
        // console.log(this.tableData[this.tableIndex].claim[0].value)
        for (let i = 0;i<this.nowComment.commentcontent.length; i++) {
          let a = {}
          a.claim = this.tableData[this.tableIndex].claim[i].value
          a.sc = this.tableData[this.tableIndex].score[i].value
          a.content = this.nowComment.commentcontent[i].value
          a.score = this.nowComment.commentscore[i].value
          this.commentTableData.push(a)
        }
        this.homeworkShow = !this.homeworkShow
      },
      handleShow(index, row) {
        this.tableIndex = index
        this.homeworkId = row._id
        this.homeworkTitle = row.title
        getTeacherComment(this.homeworkId).then(res => {
          this.homeworkData = res.data
          for(let i = 0;i<this.homeworkData.length;i++){
            if (this.homeworkData[i].teacherflag) {
              this.homeworkData[i].tf = '是'
            } else {
              this.homeworkData[i].tf = '否'
            }
          }
          this.tableShow = false
        })
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    },
    created() {
      const data = {}
      console.log(this.token)
      data.number = this.token.slice(0, this.token.length - 1)
      console.log(data)
      getStudentHomework(data).then(res => {
        console.log(res)
        this.tableData = res.data
      })
    }
  }
</script>

<style lang="scss" scoped>
  .homework-return{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px #EBEEF5 solid;
    margin-bottom: 20px;
    span{
      margin-left: 20px;
    }
  }
  .teacher-comment{
    .homework-return{
      width: 100%;
      height: 40px;
      line-height: 40px;
      border-bottom: 1px #EBEEF5 solid;
      margin-bottom: 20px;
      span{
        margin-left: 20px;
      }
    }
    .video-comment-left{
      float: left;
      /*display: inline-block;*/
      width: 45%;
    }
    .video-comment-right{
      margin-left: 20px;
      float: left;
      width: 45%;
      .comment-form{
        .comment-form-item{
          .rate{
            margin-top: 10px;
          }
        }
      }
    }
  }

</style>
