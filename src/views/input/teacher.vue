<template>
  <div class="app-container">
    <div class="search">
      <el-input class="search-input" v-model="search.value" placeholder="请输入工号或姓名"></el-input>
      <el-select v-model="search.type" placeholder="姓名或工号">
        <el-option label="姓名" value="姓名"></el-option>
        <el-option label="工号" value="工号"></el-option>
      </el-select>
      <!-- <el-select v-model="search.state" placeholder="年级">
        <el-option v-for="(item,index) in 81" :key="index" :label="index+2000" :value="index+2000"></el-option>
      </el-select>
      <el-cascader :options="options" clearable placeholder="学院专业" v-model="search.institute"></el-cascader> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getTeacherData(search)">
        查找
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addShow=true">
        添加
      </el-button>
      <el-dialog title="录入教师信息" :visible.sync="addShow">
        <el-form ref="form" :model="teacherData" label-width="80px" :rules="rule">
          <el-form-item label="姓名" prop="teacherName">
            <el-input v-model="teacherData.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="teacherNumber">
            <el-input v-model="teacherData.teacherNumber"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="teacherData.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdCard">
            <el-input v-model="teacherData.IdCard"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="teacherData.education" placeholder="请选择">
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="teacherData.political" placeholder="请选择">
              <el-option label="群众" value="群众">群众</el-option>
              <el-option label="团员" value="团员">团员</el-option>
              <el-option label="党员" value="党员">党员</el-option>
              <el-option label="其他" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="teacherData.phone"></el-input>
          </el-form-item>
          <el-form-item label="学院专业" prop="institute">
            <el-cascader :options="options" clearable v-model="teacherData.institute" placeholder="学院专业"></el-cascader>
          </el-form-item>
          <el-form-item label="毕业院校" prop="university">
            <el-input v-model="teacherData.university"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="joinTime">
            <el-date-picker v-model="teacherData.joinTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addShow=false">取消</el-button>
          <el-button type="primary" @click="add(teacherData)">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="teacher-table">
      <el-table :data="tableData" border class="table-data">
        <el-table-column prop="teacherNumber" label="工号" width="100"></el-table-column>
        <el-table-column prop="teacherName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <!-- <el-table-column prop="state" label="年级" width="100"></el-table-column> -->
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="political" label="政治面貌" width="100"></el-table-column>
        <el-table-column prop="institute" label="学院" width="180"></el-table-column>
        <el-table-column prop="education" label="学历" width="100"></el-table-column>
        <el-table-column prop="university" label="毕业院校" width="120"></el-table-column>
        <el-table-column prop="joinTime" label="入职时间" width="120"></el-table-column>
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
        <!-- <el-table-column prop="major" label="专业" width="180"></el-table-column> -->
        <!-- <el-table-column prop="class" label="班级" width="100"></el-table-column> -->
      </el-table>
    </div>
    <el-dialog title="修改教师信息" :visible.sync="changeShow">
        <el-form ref="form" :model="teacherDatachange" label-width="80px" :rules="rule">
          <el-form-item label="姓名" prop="teacherName">
            <el-input v-model="teacherDatachange.teacherName"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="teacherNumber">
            <el-input v-model="teacherDatachange.teacherNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="teacherDatachange.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdCard">
            <el-input v-model="teacherDatachange.IdCard"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="teacherDatachange.education" placeholder="请选择">
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="teacherDatachange.political" placeholder="请选择">
              <el-option label="群众" value="群众">群众</el-option>
              <el-option label="团员" value="团员">团员</el-option>
              <el-option label="党员" value="党员">党员</el-option>
              <el-option label="其他" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="teacherDatachange.phone"></el-input>
          </el-form-item>
          <el-form-item label="学院专业" prop="institute">
            <el-cascader :options="options" clearable v-model="teacherDatachange.institute" placeholder="学院专业"></el-cascader>
          </el-form-item>
          <el-form-item label="毕业院校" prop="university">
            <el-input v-model="teacherDatachange.university"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="joinTime">
            <el-date-picker v-model="teacherDatachange.joinTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeShow=false">取消</el-button>
          <el-button type="primary" @click="changedata(teacherDatachange)">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { getInstitute, addTeacher } from '@/api/addUser.js'
import { show, change, dele } from '@/api/teacher.js'
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      },
      changeShow: false,
      search: {
        value: '',
        type: '',
        // state: '',
        // institute: '',
        number: '',
        name: ''
      },
      addShow: false,
      teacherData: {
        teacherName: '',
        teacherNumber: '',
        sex: '',
        IdCard: '',
        // state: '',
        political: '',
        phone: '',
        institute: '',
        // class: '',
        type: '2',
        education: '',
        university: '',
        joinTime: ''
      },
      rule: {
        teacherName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        teacherNumber: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        sex: [{ required: true, trigger: 'blur' }],
        IdCard: [{ required: true }],
        // state: [{ required: true, trigger: 'blur' }],
        political: [{ required: true, trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur' }],
        institute: [{ required: true, trigger: 'blur' }],
        // class: [{ required: true, trigger: 'blur' }]
        education: [{ required: true, trigger: 'blur' }],
        university: [{ required: true, trigger: 'blur' }],
        joinTime: [{ required: true, trigger: 'blur' }]
      },
      options: [],
      tableData: [],
      teacherDatachange: {
        teacherName: '',
        teacherNumber: '',
        sex: '',
        IdCard: '',
        political: '',
        phone: '',
        institute: '',
        education: '',
        university: '',
        joinTime: ''
      },
      teacherdele: {
        teacherNumber: ''
      }
    }
  },
  methods: {
    add(teacherData) {
      addTeacher(teacherData).then((res) => {
        this.search.name = ''
        this.search.number = ''
        show(this.search).then(result => {
          this.tableData = result.data
        })
        console.log(res)
        this.addShow = false
        this.teacherData.teacherName = ''
        this.teacherData.teacherNumber = ''
        this.teacherData.sex = ''
        this.teacherData.IdCard = ''
        // this.teacherData.state = ''
        this.teacherData.political = ''
        this.teacherData.phone = ''
        this.teacherData.institute = ''
        // this.teacherData.class = ''
        this.teacherData.education = ''
        this.teacherData.university = ''
        this.teacherData.joinTime = ''
      })
    },
    getTeacherData(search) {
      search.name = ''
      search.number = ''
      if (search.type === '姓名') {
        search.name = search.value
        show(search).then(res => {
          console.log(res)
          this.tableData = res.data
          // console.log(this.tableData)
        })
      } else if (search.type === '工号') {
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
      this.teacherDatachange.teacherName = this.tableData[index].teacherName
      this.teacherDatachange.teacherNumber = this.tableData[index].teacherNumber
      this.teacherDatachange.sex = this.tableData[index].sex
      this.teacherDatachange.IdCard = this.tableData[index].IdCard
      this.teacherDatachange.political = this.tableData[index].political
      this.teacherDatachange.phone = this.tableData[index].phone
      this.teacherDatachange.institute = this.tableData[index].institute
      this.teacherDatachange.education = this.tableData[index].education
      this.teacherDatachange.university = this.tableData[index].university
      this.teacherDatachange.joinTime = this.tableData[index].joinTime
      this.changeShow = true
    },
    handleDelete(index, row) {
      this.teacherdele.teacherNumber = this.tableData[index].teacherNumber
      dele(this.teacherdele).then(res => {
        console.log(res)
        if (res.data) {
          this.getTeacherData(this.search)
          this.teacherdele.teacherNumber = ''
        }
      })
    },
    changedata(data) {
      change(data).then((res) => {
        if (res.data) {
          this.getTeacherData(this.search)
          this.changeShow = false
        }
      })
    }
  },
  created() {
    getInstitute().then(res => {
      console.log(res)
      this.options = res.data
    })
    this.getTeacherData(this.search)
  }
}
</script>

<style lang="scss" scoped>
  .teacher-table{
    margin-top: 40px;
    .table-data{
      width: 100%;
      overflow-x: hidden;
    }
  }
</style>
<style scoped>
  .el-input{
    width: 30%;
  }
</style>
