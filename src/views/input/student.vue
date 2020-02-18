<template>
  <div class="app-container">
    <div class="search">
      <el-input class="search-input" v-model="search.value" placeholder="请输入学号或姓名"></el-input>
      <el-select v-model="search.type" placeholder="姓名或学号">
        <el-option label="姓名" value="姓名"></el-option>
        <el-option label="学号" value="学号"></el-option>
      </el-select>
      <!-- <el-select v-model="search.state" placeholder="年级">
        <el-option v-for="(item,index) in 81" :key="index" :label="index+2000" :value="index+2000"></el-option>
      </el-select>
      <el-cascader :options="options" clearable placeholder="学院专业" v-model="search.institute"></el-cascader> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getStudentData(search)">
        查找
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addShow=true">
        添加
      </el-button>
      <el-dialog title="录入学生信息" :visible.sync="addShow">
        <el-form ref="form" :model="studentData" label-width="80px" :rules="rule">
          <el-form-item label="姓名" prop="studentName">
            <el-input v-model="studentData.studentName"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentNumber">
            <el-input v-model="studentData.studentNumber"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="studentData.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdCard">
            <el-input v-model="studentData.IdCard"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="state">
            <el-select v-model="studentData.state" placeholder="请选择">
              <el-option v-for="(item,index) in 81" :key="index" :label="index+2000" :value="index+2000"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="studentData.political" placeholder="请选择">
              <el-option label="群众" value="群众">群众</el-option>
              <el-option label="团员" value="团员">团员</el-option>
              <el-option label="党员" value="党员">党员</el-option>
              <el-option label="其他" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="studentData.phone"></el-input>
          </el-form-item>
          <el-form-item label="学院专业" prop="institute">
            <el-cascader :options="options" clearable v-model="studentData.institute" placeholder="学院专业"></el-cascader>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="studentData.class"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addShow=false">取消</el-button>
          <el-button type="primary" @click="add(studentData)">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="student-table">
      <el-table :data="tableData" border class="">
        <el-table-column prop="studentNumber" label="学号" width="100"></el-table-column>
        <el-table-column prop="studentName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="state" label="年级" width="100"></el-table-column>
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="political" label="政治面貌" width="100"></el-table-column>
        <el-table-column prop="institute" label="学院" width="180"></el-table-column>
        <el-table-column prop="major" label="专业" width="180"></el-table-column>
        <el-table-column prop="class" label="班级" width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改学生信息" :visible.sync="changeShow">
        <el-form ref="form" :model="studentDatachange" label-width="80px" :rules="rule">
          <el-form-item label="姓名" prop="studentName">
            <el-input v-model="studentDatachange.studentName"></el-input>
          </el-form-item>
          <el-form-item label="学号" prop="studentNumber">
            <el-input v-model="studentDatachange.studentNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="studentDatachange.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdCard">
            <el-input v-model="studentDatachange.IdCard"></el-input>
          </el-form-item>
          <el-form-item label="年级" prop="state">
            <el-select v-model="studentDatachange.state" placeholder="请选择">
              <el-option v-for="(item,index) in 81" :key="index" :label="index+2000" :value="index+2000"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="studentDatachange.political" placeholder="请选择">
              <el-option label="群众" value="群众">群众</el-option>
              <el-option label="团员" value="团员">团员</el-option>
              <el-option label="党员" value="党员">党员</el-option>
              <el-option label="其他" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="studentDatachange.phone"></el-input>
          </el-form-item>
          <el-form-item label="学院专业" prop="institute">
            <el-cascader :options="options" clearable v-model="studentDatachange.institute" placeholder="学院专业"></el-cascader>
          </el-form-item>
          <el-form-item label="班级" prop="class">
            <el-input v-model="studentDatachange.class"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeShow=false">取消</el-button>
          <el-button type="primary" @click="changedata(studentDatachange)">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getInstitute, addStudent } from '@/api/addUser.js'
import { show, change, dele } from '@/api/student.js'
export default {
  data() {
    return {
      search: {
        value: '',
        type: '',
        // state: '',
        // institute: '',
        number: '',
        name: ''
      },
      addShow: false,
      studentData: {
        studentName: '',
        studentNumber: '',
        sex: '',
        IdCard: '',
        state: '',
        political: '',
        phone: '',
        institute: '',
        class: '',
        type: '1'
      },
      rule: {
        studentName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        studentNumber: [{ required: true, message: '请输入学号', trigger: 'blur' }],
        sex: [{ required: true, trigger: 'blur' }],
        IdCard: [{ required: true }],
        state: [{ required: true, trigger: 'blur' }],
        political: [{ required: true, trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur' }],
        institute: [{ required: true, trigger: 'blur' }],
        class: [{ required: true, trigger: 'blur' }]
      },
      options: [],
      tableData: [],
      changeShow: false,
      studentDatachange: {
        studentName: '',
        studentNumber: '',
        sex: '',
        IdCard: '',
        state: '',
        political: '',
        phone: '',
        institute: [],
        class: ''
      },
      studentdele: {
        studentNumber: ''
      }
    }
  },
  methods: {
    add(studentData) {
      addStudent(studentData).then((res) => {
        this.search.name = ''
        this.search.number = ''
        show(this.search).then(result => {
          this.tableData = result.data
        })
        this.addShow = false
        this.studentData.studentName = ''
        this.studentData.studentNumber = ''
        this.studentData.sex = ''
        this.studentData.IdCard = ''
        this.studentData.state = ''
        this.studentData.political = ''
        this.studentData.phone = ''
        this.studentData.institute = ''
        this.studentData.class = ''
      })
    },
    getStudentData(search) {
      search.name = ''
      search.number = ''
      if (search.type === '姓名') {
        search.name = search.value
        show(search).then(res => {
          console.log(res)
          this.tableData = res.data
          // console.log(this.tableData)
        })
      } else if (search.type === '学号') {
        search.number = search.value
        show(search).then(res => {
          console.log(res)
          this.tableData = res.data
          // console.log(this.tableData)
        })
      } else {
        show(search).then(res => {
          console.log(res)
          this.tableData = res.data
          // console.log(this.tableData)
        })
      }
    },
    handleEdit(index, row) {
      // console.log(index, row)
      // console.log(this.tableData)
      var arr = []
      arr.push(this.tableData[index].institute)
      arr.push(this.tableData[index].major)
      this.studentDatachange.studentName = this.tableData[index].studentName
      this.studentDatachange.studentNumber = this.tableData[index].studentNumber
      this.studentDatachange.sex = this.tableData[index].sex
      this.studentDatachange.IdCard = this.tableData[index].IdCard
      this.studentDatachange.state = this.tableData[index].state
      this.studentDatachange.political = this.tableData[index].political
      this.studentDatachange.phone = this.tableData[index].phone
      this.studentDatachange.institute = arr
      this.studentDatachange.class = this.tableData[index].class
      this.changeShow = true
      console.log(this.studentDatachange.institute)
    },
    handleDelete(index, row) {
      this.studentdele.studentNumber = this.tableData[index].studentNumber
      dele(this.studentdele).then(res => {
        console.log(res)
        if (res.data) {
          this.getStudentData(this.search)
          this.studentdele.studentNumber = ''
        }
      })
    },
    changedata(data) {
      change(data).then((res) => {
        if (res.data) {
          this.getStudentData(this.search)
          this.changeShow = false
        }
      })
    }
  },
  created() {
    getInstitute().then(res => {
      // console.log(res)
      this.options = res.data
    })
    this.getStudentData(this.search)
  }
}
</script>

<style lang="scss" scoped>
  .student-table{
    margin-top: 40px;
  }
</style>
<style scoped>
  .el-input{
    width: 30%;
  }
</style>
