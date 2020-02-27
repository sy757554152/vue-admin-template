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
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleShow(scope.$index, scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-if="!tableShow&&flag">
      <div class="homework-return">
        <el-link type="primary" icon="el-icon-arrow-left" :underline="false" @click="tableShow=!tableShow">返回</el-link>
        <span>教师评价详情</span>
      </div>
      <div class="title">学生评价</div>
      <el-table :data="commentTableData" border class="commenttabledata">
        <el-table-column prop="claim" label="作业要求" width="180"></el-table-column>
        <el-table-column prop="sc" label="评分标准" width="180"></el-table-column>
        <el-table-column prop="content" label="学生评价" width="180"></el-table-column>
        <el-table-column prop="score" label="分数"></el-table-column>
      </el-table>
      <div class="title">老师评价</div>
      <el-table :data="teacherComment" border >
        <el-table-column prop="content" label="教师评价" width="180"></el-table-column>
        <el-table-column prop="score" label="分数" width="180"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { show } from '@/api/comment.js'
  import { getComment } from '@/api/studentview'
  export default {
    data() {
      return {
        tableData: [],
        tableIndex: '',
        homeworkId: '',
        tableShow: true,
        commentData: {},
        commentTableData: [],
        teacherComment: [],
        flag: true
      }
    },
    methods: {
      handleShow(index, row){
        this.tableIndex = index
        this.homeworkId = row._id
        let data = {}
        data.homeworkId = this.homeworkId
        data.commentNumber = this.token.slice(0, this.token.length - 1)
        getComment(data).then(res => {
          if(res.flag){
            this.commentData = res.data
            this.commentTableData = []
            // console.log(this.tableData)
            for (let i = 0;i<this.commentData.commentcontent.length; i++) {
              let a = {}
              a.claim = this.tableData[this.tableIndex].claim[i].value
              a.sc = this.tableData[this.tableIndex].score[i].value
              a.content = this.commentData.commentcontent[i].value
              a.score = this.commentData.commentscore[i].value
              this.commentTableData.push(a)
            }
            this.teacherComment = []
            let t = {}
            t.content = this.commentData.teachercontent
            t.score = this.commentData.teacherscore
            this.teacherComment.push(t)
            this.tableShow = false
          } else {
            this.commentTableData = []
            this.teacherComment = []
            this.tableShow = false
          }

        })
      }
    },
    computed: {
      ...mapGetters([
        'token',
        'name',
        'state',
        'major',
        'institute',
        'classes'
      ])
    },
    created() {
      const data = {}
      // data.name = this.name
      data.state = this.state
      // data.number = this.token.slice(0, this.token.length - 1)
      data.institute = this.institute
      data.major = this.major
      data.class = this.classes
      console.log(data)
      show(data).then(res => {
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
  .commenttabledata{
    margin-bottom: 20px;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .content{
    font-size: 18px;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
</style>
