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
          <el-button size="mini" @click="handleShow(scope.$index, scope.row)">评价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-show="(!tableShow)&&(commentShow||videoShow)" class="homework">
    <!--           修改评价      -->
      <div v-if="commentShow" class="comment-continue">
        <div class="video-comment-left">
          <video src="https://vdept.bdstatic.com/444363756b31535377664c466e417756/7a51585572756a50/28f62a2c7876ea25d8bc046185f7e5bc5af83a8dfb309dab34fecba02a8edbc5e27be6959fd4cce2fbacfa6c5f6c33e7.mp4?auth_key=1582436595-0-0-fda779cab6a904dfa2e840bd87672776" controls width="100%" height="624"></video>
        </div>
        <div class="video-comment-right">
          <div class="comment-title">
            <span class="title">作业题目</span>
            <span class="value">{{homework.title}}</span>
          </div>
          <div v-for="(item,index) in homework.score" :key="index" class="comment-score">
            <span class="title">评分标准{{index+1}}</span>
            <span class="value">{{item.value}}</span>
            <div class="choose">
              <el-radio v-model="commentData.commentscore[index].value" label="1">1</el-radio>
              <el-radio v-model="commentData.commentscore[index].value" label="2">2</el-radio>
              <el-radio v-model="commentData.commentscore[index].value" label="3">3</el-radio>
              <el-radio v-model="commentData.commentscore[index].value" label="4">4</el-radio>
              <el-radio v-model="commentData.commentscore[index].value" label="5">5</el-radio>
            </div>
            <div class="content">
              <el-input type="textarea" :rows="2" placeholder="请详细描述" v-model="commentData.commentcontent[index].value"></el-input>
            </div>
          </div>
          <div class="comment-btn">
            <el-button type="primary" class="btn" round @click="changecomment()">提交</el-button>
          </div>
        </div>
      </div>
      <!--          评价    -->
      <div class="video-comment" v-if="videoShow">
<!--        <video src="http://vfx.mtime.cn/Video/2019/02/04/mp4/190204084208765161.mp4" controls></video>-->
        <div class="video-comment-left">
          <video src="https://vdept.bdstatic.com/444363756b31535377664c466e417756/7a51585572756a50/28f62a2c7876ea25d8bc046185f7e5bc5af83a8dfb309dab34fecba02a8edbc5e27be6959fd4cce2fbacfa6c5f6c33e7.mp4?auth_key=1582436595-0-0-fda779cab6a904dfa2e840bd87672776" controls width="100%" height="624"></video>
        </div>
        <div class="video-comment-right">
          <div class="comment-title">
            <span class="title">作业题目</span>
            <span class="value">{{homework.title}}</span>
          </div>
          <div v-for="(item,index) in homework.score" :key="index" class="comment-score">
            <span class="title">评分标准{{index+1}}</span>
            <span class="value">{{item.value}}</span>
            <div class="choose">
              <el-radio v-model="videoHomework.commentscore[index].value" label="1">1</el-radio>
              <el-radio v-model="videoHomework.commentscore[index].value" label="2">2</el-radio>
              <el-radio v-model="videoHomework.commentscore[index].value" label="3">3</el-radio>
              <el-radio v-model="videoHomework.commentscore[index].value" label="4">4</el-radio>
              <el-radio v-model="videoHomework.commentscore[index].value" label="5">5</el-radio>
            </div>
            <div class="content">
              <el-input type="textarea" :rows="2" placeholder="请详细描述" v-model="videoHomework.commentcontent[index].value"></el-input>
            </div>
          </div>
          <div class="comment-btn">
            <el-button type="primary" class="btn" round @click="addcomment()">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="(!videoShow)&&(!commentShow)">
      {{videoMessage}}
    </div>

  </div>
</template>

<script>
import { show, getComment, getVideo, getHomework, addVideoComment, changehomework,changeComment } from '@/api/comment.js'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      tableData: [],
      tableIndex: '',
      tableTitle: '',
      tableClaim: [],
      tableScore: [],
      teacherName: '',
      teacherNumber: '',
      homeworkId: '',
      tableAnswer: '',
      tableShow: true,
      videoShow: false,
      commentShow: true,
      videoMessage: '',
      commentData: {},
      commentcontinueScore: [],
      commentcontinueContent: [],
      videoData: {},
      address: '',
      homework: {},
      starttime: [],
      videoHomework: {
        commentNumber: '',
        commentName: '',
        studentNumber: '',
        studentName: '',
        teacherflag: false,
        homeworkId: '',
        state: '',
        institute: '',
        major: '',
        class: '',
        address: '',
        flag: false,
        commentcontent: [{
          value: ''
        }],
        commentscore: [{
          value: ''
        }],
        teacherscore: '',
        tecahercontent: '',
        time: '',
        frequency: ''
      }
    }
  },
  methods: {
    changecomment(){
      console.log('123456')
      const time = Date().split(' ')
      const day = time[2]
      const mday = day - this.starttime[2]
      const hour = (time[4].split(':')[0])*1+mday*24 - (this.starttime[4].split(':')[0])*1
      const minute = (time[4].split(':')[1])*1 - (this.starttime[4].split(':')[1])*1
      const second = (time[4].split(':')[2])*1 - (this.starttime[4].split(':')[2])*1
      const mount = hour*3600+minute*60+second
      this.commentData.time += mount
      this.commentData.frequency += 1
      changeComment(this.commentData).then(res => {
        console.log(res)
        if (res.flag) {
          this.open1()
          setTimeout(() => {
            this.commentShow = true
            this.tableShow = true
            this.videoShow = false
          },2000)
        }
      })
    },
    open1() {
      this.$notify({
        title: '成功',
        message: '提交成功',
        type: 'success'
      })
    },
    addcomment() {
      const time = Date().split(' ')
      const day = time[2]
      const mday = day - this.starttime[2]
      const hour = (time[4].split(':')[0])*1+mday*24 - (this.starttime[4].split(':')[0])*1
      const minute = (time[4].split(':')[1])*1 - (this.starttime[4].split(':')[1])*1
      const second = (time[4].split(':')[2])*1 - (this.starttime[4].split(':')[2])*1
      const mount = hour*3600+minute*60+second

      this.videoHomework.commentNumber = this.token.slice(0, this.token.length - 1)
      this.videoHomework.commentName  = this.name
      this.videoHomework.studentNumber = this.videoData.studentNumber
      this.videoHomework.studentName = this.videoData.studentName
      this.videoHomework.homeworkId = this.homeworkId
      this.videoHomework.state = this.state
      this.videoHomework.institute = this.institute
      this.videoHomework.major = this.major
      this.videoHomework.class = this.classes
      this.videoHomework.address = this.videoData.address
      this.videoHomework.time = mount
      this.videoHomework.frequency = 1
      addVideoComment(this.videoHomework).then(res => {
        console.log(res)
        if (res.flag) {
          changehomework(this.videoData).then(re => {
            console.log(re)
            this.open1()
            setTimeout(() => {
              this.commentShow = true
              this.tableShow = true
              this.videoShow = false
            },2000)
          })
        }
      })
    },
    handleShow(index, row) {
      this.tableIndex = index
      this.tableTitle = row.title
      this.tableClaim = row.claim
      this.teacherName = row.teacherName
      this.teacherNumber = row.teacherNumber
      this.homeworkId = row._id
      this.tableAnswer = this.tableData[this.tableIndex].answer
      this.tableScore = this.tableData[this.tableIndex].score
      // console.log(this.tableAnswer)
      this.tableShow = !this.tableShow
      // console.log(this.institute)
      const data = {}
      // console.log(typeof(this.token))
      // const number = this.token
      data.number = this.token.slice(0, this.token.length - 1)
      data.homeworkId = this.homeworkId
      data.name = this.name
      // console.log('1')
      getComment(data).then(res => {
        console.log('1')
        if (!res.flag) {
          this.commentShow = false
          getVideo(data).then(result => {
            console.log('3')
            if (!result.flag) {
              this.videoShow = false
              this.videoMessage = result.message
            } else {
              this.videoShow = true
              this.videoData = result.data
              getHomework(this.videoData).then(re => {
                console.log('5')
                if (re) {
                  this.homework = re.data
                  for (var i = 0; i < this.homework.score.length-1; i++) {
                    this.videoHomework.commentscore.push({
                      value: ''
                    })
                    this.videoHomework.commentcontent.push({
                      value: ''
                    })
                  }
                  this.starttime = Date().split(' ')
                  console.log(this.homework)
                } else {
                  this.videoShow = false
                }
              })
              console.log(result.data)
            }
          })
        } else {
            this.commentData = res.data
            getHomework(this.commentData).then(res => {
              console.log(res)
              this.homework = res.data
              this.starttime = Date().split(' ')
            })
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
  .video-comment{
    width: 100%;
    /*display: inline-block;*/
    .video-comment-left{
      float: left;
      /*display: inline-block;*/
      width: 45%;
    }
    .video-comment-right{
      float: left;
      /*display: inline-block;*/
      margin-left: 20px;
      width: 45%;
      .comment-title{
        width: 100%;
        .title{
          display: inline-block;
          width: 30%;
          height: 50px;
          font-size: 18px;
          line-height: 50px;
          /*text-align: center;*/
        }
        .value{
          width: 50%;
          display: inline-block;
          height: 70px;
          font-size: 20px;
          line-height: 70px;
          text-align: center;
        }
      }
      .comment-score{
        width: 100%;
        .title{
          display: inline-block;
          width: 30%;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          /*text-align: center;*/
        }
        .value{
          width: 50%;
          display: inline-block;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          text-align: center;
        }
        .choose{
          height: 50px;
          line-height: 50px;
        }
        .content{
          padding-top: 20px;
        }
      }
      .comment-btn{
        padding: 20px 0;
        position: relative;
        width: 100%;
        .btn{
          min-width: 100px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
  .comment-continue{
    width: 100%;
    /*display: inline-block;*/
    .video-comment-left{
      float: left;
      /*display: inline-block;*/
      width: 45%;
    }
    .video-comment-right{
      float: left;
      /*display: inline-block;*/
      margin-left: 20px;
      width: 45%;
      .comment-title{
        width: 100%;
        .title{
          display: inline-block;
          width: 30%;
          height: 50px;
          font-size: 18px;
          line-height: 50px;
          /*text-align: center;*/
        }
        .value{
          width: 50%;
          display: inline-block;
          height: 70px;
          font-size: 20px;
          line-height: 70px;
          text-align: center;
        }
      }
      .comment-score{
        width: 100%;
        .title{
          display: inline-block;
          width: 30%;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          /*text-align: center;*/
        }
        .value{
          width: 50%;
          display: inline-block;
          height: 50px;
          font-size: 16px;
          line-height: 50px;
          text-align: center;
        }
        .choose{
          height: 50px;
          line-height: 50px;
        }
        .content{
          padding-top: 20px;
        }
      }
      .comment-btn{
        padding: 20px 0;
        position: relative;
        width: 100%;
        .btn{
          min-width: 100px;
          position: relative;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>
