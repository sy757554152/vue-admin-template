<template>
  <div class="app-container">
    <el-form :model="homework" ref="homework" label-width="100px" class="demo-dynamic">
      <el-form-item label="作业题目" :rules="{required: true, message: '题目不能为空', trigger: 'blur'}">
        <el-input v-model="homework.title"></el-input>
      </el-form-item>
      <el-form-item label="年级" prop="state">
        <el-select v-model="homework.state" placeholder="请选择">
          <el-option v-for="(item,index) in 81" :key="index" :label="index+2000" :value="index+2000"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="学院专业" prop="institute">
        <el-cascader :options="options" clearable v-model="homework.institute" placeholder="学院专业"></el-cascader>
      </el-form-item>
      <el-form-item label="班级" prop="class">
        <el-input v-model="homework.class"></el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in homework.claim"
        :label="'作业要求' + (index+1)"
        :key="index"
        :rules="{
        required: true, message: '要求不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="item.value"></el-input><el-button @click.prevent="removeDomain(item)">删除</el-button>
      </el-form-item>
      <el-form-item label="参考答案" :rules="{required: true, message: '参考答案不能为空', trigger: 'blur'}">
        <el-input
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="homework.answer">
        </el-input>
      </el-form-item>
      <el-form-item
        v-for="(item, index) in homework.score"
        :label="'评分标准' + (index+1)"
        :key="index+' '"
        :rules="{
        required: true, message: '评分标准不能为空', trigger: 'blur'
        }"
      >
        <el-input v-model="item.value"></el-input><el-button @click.prevent="removeScore(item)">删除</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(homework)">提交</el-button>
        <el-button @click="addDomain">新增要求及评分标准</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addHomework, getTeacher } from '@/api/homeworkTeacher'
import { getInstitute } from '@/api/addUser.js'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  data() {
    return {
      options: [],
      homework: {
        claim: [{
          value: ''
        }],
        title: '',
        answer: '',
        teacherNumber: '',
        teacherName: '',
        score: [{
          value: ''
        }],
        class: '',
        state: '',
        institute: ''
      }
    }
  },
  created() {
    getInstitute().then(res => {
      this.options = res.data
    })
  },
  methods: {
    open1() {
      this.$notify({
        title: '成功',
        message: '提交成功',
        type: 'success'
      })
    },
    submitForm(data) {
      // console.log(this.token)
      var teacherId = this.token.slice(0, this.token.length - 1)
      getTeacher(teacherId).then(res => {
        data.teacherNumber = res.data.teacherNumber
        data.teacherName = res.data.teacherName
        addHomework(data).then(res => {
          if (res) {
            this.open1()
            this.homework.title = ''
            this.homework.answer = ''
            this.homework.claim = [{ value: '' }]
            this.homework.score = [{ value: '' }]
            this.homework.class = ''
            this.homework.state = ''
            this.homework.institute = []
          }
        })
      })
      // addHomework(data,).then(res => {
      //   if (res) {
      //     this.open1()
      //     this.homework.title = ''
      //     this.homework.answer = ''
      //     this.homework.claim = [{ value: '' }]
      //   }
      // })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.homework.claim.indexOf(item)
      if (index !== -1) {
        this.homework.claim.splice(index, 1)
      }
    },
    addDomain() {
      this.homework.claim.push({
        value: ''
      })
      this.homework.score.push({
        value: ''
      })
    },
    removeScore(item) {
      var index = this.homework.score.indexOf(item)
      if (index !== -1) {
        this.homework.score.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input {
    width: 60%;
    margin-right: 20px;
  }
</style>
