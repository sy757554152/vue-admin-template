<template>
  <div class="app-container">
    <el-table :data="tableData" border v-show="tableShow">
      <el-table-column prop="_id" label="作业ID" width="180"></el-table-column>
      <el-table-column prop="title" label="作业名称" width="180"></el-table-column>
      <el-table-column prop="teacherNumber" label="教师工号" width="180"></el-table-column>
      <el-table-column prop="teacherName" label="教师姓名" width="180"></el-table-column>
      <el-table-column prop="createDate" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="180">
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
        <tr valign="middle" v-for="(item, index) in tableScore" :key="index+'score'">
          <td class="title">评分标准{{index+1}}</td>
          <td class="value">{{item.value}}</td>
        </tr>
      </table>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </div>
  </div>
</template>

<script>
import { show } from '@/api/viewhomework'
// import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      tableData: [],
      tableShow: true,
      tableIndex: 0,
      tableTitle: '',
      tableClaim: [],
      tableScore: [],
      fileList: []
    }
  },
  methods: {
    handleShow(index, row) {
      this.tableIndex = index
      this.tableTitle = row.title
      this.tableClaim = row.claim
      this.tableScore = row.score
      this.tableShow = !this.tableShow
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    }
  },
  created() {
    show().then(res => {
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
