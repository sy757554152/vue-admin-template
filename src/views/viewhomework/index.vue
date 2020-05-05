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
    <div v-show="!tableShow" class="homework">
      <div class="homework-return">
        <el-link type="primary" icon="el-icon-arrow-left" :underline="false" @click="tableShow=!tableShow">返回</el-link>
        <span>作业详情</span>
      </div>
      <!-- <div class="homework-content">
        <div class="homework-content-title">
          <div class="title">c</div>
          <div class="value">{{tableTitle}}</div>
        </div>
        <div class="homework-content-claim" v-for="(item, index) in tableClaim" :key="index+'claim'">
          <div class="title">作业要求{{index+1}}</div>
          <div class="value">{{item.value}}</div>
        </div>
        <div class="homework-content-score" v-for="(item, index) in tableScore" :key="index+'score'">
          <div class="title">评分标准{{index+1}}</div>
          <div class="value">{{item.value}}</div>
        </div>
      </div> -->
      <table border="1" align="center">
        <tr valign="middle">
          <td class="title">作业题目</td>
          <td class="value">{{tableTitle}}</td>
        </tr>
        <tr valign="middle" v-for="(item, index) in tableClaim" :key="index+'claim'">
          <td class="title">作业要求{{index+1}}</td>
          <td class="value">{{item.value}}</td>
        </tr>
        <tr valign="middle">
          <td class="title">参考答案</td>
          <td class="value">{{tableAnswer}}</td>
        </tr>
        <tr valign="middle" v-for="(item, index) in tableScore" :key="index+'score'">
          <td class="title">评分标准{{index+1}}</td>
          <td class="value">{{item.value}}</td>
        </tr>
        <!-- <tr valign="middle" v-for="(item, index) in tableScore" :key="index+'score'">
          <td class="title">评分标准{{index+1}}</td>
          <td class="value">{{item.value}}</td>
        </tr> -->
      </table>
      <el-upload
        class="upload-demo"
        action="/abcs"
        :before-upload="beforeUpload"
        :on-success="videoSuccess"
        name="file"
        multiple>
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip"></div>
      </el-upload>
      <!-- <el-button size="small" type="primary" @click="add()">点击上传</el-button> -->
    </div>
  </div>
</template>

<script>
import { show, addVideo } from '@/api/viewhomework'
import { mapGetters } from 'vuex'
// import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      tableData: [],
      tableShow: true,
      tableIndex: 0,
      tableTitle: '',
      tableClaim: [],
      teacherName: '',
      teacherNUmber: '',
      homeworkId: '',
      tableAnswer: '',
      tableScore: [],
      // tableScore: [],
      fileList: []
    }
  },
  computed: {
    ...mapGetters([
      'institute',
      'token',
      'state',
      'classes',
      'major',
      'name'
    ])
  },
  methods: {
    open1() {
      this.$notify({
        title: '成功',
        message: '提交成功',
        type: 'success'
      })
    },
    beforeUpload(file) {
      var fd = new FormData()
      fd.append('file', file)
      fd.append('studentNumber', this.token.slice(0, this.token.length - 1))
      fd.append('studentName', this.name)
      fd.append('state', this.state)
      fd.append('institute', this.institute)
      fd.append('major', this.major)
      fd.append('class', this.classes)
      fd.append('teacherName', this.teacherName)
      fd.append('teacherNumber', this.teacherNumber)
      fd.append('homeworkId', this.homeworkId)
      fd.append('flag', false)
      // console.log(fd.get('file'))
      // console.log(file)
      addVideo(fd).then(res => {
        console.log(res)
        this.open1()
        setTimeout(() => {
          this.$router.go(0)
        }, 2000)
      })
    },
    // add() {
    //   addVideo().then(res => {
    //     console.log(res)
    //     this.open1()
    //   })
    // },
    handleShow(index, row) {
      this.tableIndex = index
      this.tableTitle = row.title
      this.tableClaim = row.claim
      this.tableScore = row.score
      this.teacherName = row.teacherName
      this.teacherNumber = row.teacherNumber
      this.homeworkId = row._id
      this.tableAnswer = this.tableData[this.tableIndex].answer
      this.tableScore = this.tableData[this.tableIndex].score
      console.log(this.tableAnswer)
      this.tableShow = !this.tableShow
      // console.log(this.institute)
    },
    videoSuccess(res) {
      console.log(res)
    }
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
  .homework{
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
    // .homework-content{
    //   width: 100%;
    //   .homework-content-title{
    //     div{
    //       display: inline-block;
    //     }
    //     .title{
    //       width: 20%;
    //       height: 50px;
    //       line-height: 50px;
    //       text-align: center;
    //       border: 1px #EBEEF5 solid;
    //     }
    //     .value{
    //       width: 60%;
    //       height: 50px;
    //       line-height: 50px;
    //       text-align: center;
    //       border: 1px #EBEEF5 solid;
    //       border-left: 0px;
    //     }
    //   }
    //   .homework-content-claim{
    //     overflow: hidden;
    //     div{
    //       display: table-cell;
    //       // display: inline-block;
    //       float: left;
    //     }
    //     .title{
    //       width: 20%;
    //       text-align: center;
    //       min-height: 50px;
    //       line-height: 50px;
    //       border: 1px #EBEEF5 solid;
    //       border-top: 0px;
    //       vertical-align: middle;
    //     }
    //     .value{
    //       width: 60%;
    //       min-height: 50px;
    //       line-height: 50px;
    //       text-align: center;
    //       border: 1px #EBEEF5 solid;
    //       border-left: 0px;
    //       border-top: 0px;
    //       vertical-align: middle;
    //     }
    //   }
    //   .homework-content-score{
    //     div{
    //       display: inline-block;
    //     }
    //     .title{
    //       width: 20%;
    //       height: 50px;
    //       line-height: 50px;
    //       text-align: center;
    //       border: 1px #EBEEF5 solid;
    //       border-top: 0px;
    //     }
    //     .value{
    //       width: 60%;
    //       height: 50px;
    //       line-height: 50px;
    //       text-align: center;
    //       border: 1px #EBEEF5 solid;
    //       border-left: 0px;
    //       border-top: 0px;
    //     }
    //   }
    // }
    table{
      border-collapse: collapse;
      margin-bottom: 20px;
      tr{
        td{
          text-align: center;
          border: 1px solid #888;
        }
        .title{
          width: 20%;
          height: 50px;
        }
        .value{
          width: 60%;
          height: 50px;
        }
      }
    }
  }
</style>
<style>
  .el-upload__tip{
    font-size: 18px;
  }
  .upload-demo{
    text-align: center;
  }
  .el-button--medium{
    margin: 50px;
  }
  .el-upload-list__item-name{
    font-size: 18px;
  }
</style>
