<template>
  <div class="app-container">
    <div class="search">
      <el-input class="search-input" v-model="search.value" placeholder="请输入工号或姓名"></el-input>
      <el-select v-model="search.type" placeholder="工号">
        <el-option label="姓名" value="姓名"></el-option>
        <el-option label="工号" value="工号"></el-option>
      </el-select>
      <!-- <el-select v-model="search.state" placeholder="年级">
        <el-option v-for="(item,index) in 81" :key="index" :label="index+2000" :value="index+2000"></el-option>
      </el-select>
      <el-cascader :options="options" clearable placeholder="学院专业" v-model="search.institute"></el-cascader> -->
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getAdminData(search)">
        查找
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="addShow=true">
        添加
      </el-button>
      <el-dialog title="录入管理员信息" :visible.sync="addShow">
        <el-form ref="form" :model="adminData" label-width="80px" :rules="rule">
          <el-form-item label="姓名" prop="adminName">
            <el-input v-model="adminData.adminName"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="adminNumber">
            <el-input v-model="adminData.adminNumber"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="adminData.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdCard">
            <el-input v-model="adminData.IdCard"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="adminData.education" placeholder="请选择">
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="adminData.political" placeholder="请选择">
              <el-option label="群众" value="群众">群众</el-option>
              <el-option label="团员" value="团员">团员</el-option>
              <el-option label="党员" value="党员">党员</el-option>
              <el-option label="其他" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="adminData.phone"></el-input>
          </el-form-item>
          <!-- <el-form-item label="学院专业" prop="institute">
            <el-cascader :options="options" clearable v-model="adminData.institute" placeholder="学院专业"></el-cascader>
          </el-form-item> -->
          <el-form-item label="毕业院校" prop="university">
            <el-input v-model="adminData.university"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="university">
            <el-date-picker v-model="adminData.joinTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="adminData.position"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addShow=false">取消</el-button>
          <el-button type="primary" @click="add(adminData)">确定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="admin-table">
      <el-table :data="tableData" border class="">
        <el-table-column prop="adminNumber" label="工号" width="100"></el-table-column>
        <el-table-column prop="adminName" label="姓名" width="100"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <!-- <el-table-column prop="state" label="年级" width="100"></el-table-column> -->
        <el-table-column prop="phone" label="电话" width="120"></el-table-column>
        <el-table-column prop="political" label="政治面貌" width="100"></el-table-column>
        <!-- <el-table-column prop="institute" label="学院" width="180"></el-table-column> -->
        <el-table-column prop="education" label="学历" width="100"></el-table-column>
        <el-table-column prop="university" label="毕业院校" width="120"></el-table-column>
        <el-table-column prop="joinTime" label="入职时间" width="120"></el-table-column>
        <el-table-column prop="position" label="职位" width="120"></el-table-column>
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
    <el-dialog title="修改管理员信息" :visible.sync="changeShow">
        <el-form ref="form" :model="adminDatachange" label-width="80px" :rules="rule">
          <el-form-item label="姓名" prop="adminName">
            <el-input v-model="adminDatachange.adminName"></el-input>
          </el-form-item>
          <el-form-item label="工号" prop="adminNumber">
            <el-input v-model="adminDatachange.adminNumber" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="adminDatachange.sex">
              <el-radio label="男" value="男">男</el-radio>
              <el-radio label="女" value="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="身份证号" prop="IdCard">
            <el-input v-model="adminDatachange.IdCard"></el-input>
          </el-form-item>
          <el-form-item label="学历" prop="education">
            <el-select v-model="adminDatachange.education" placeholder="请选择">
              <el-option label="初中" value="初中"></el-option>
              <el-option label="高中" value="高中"></el-option>
              <el-option label="本科" value="本科"></el-option>
              <el-option label="硕士" value="硕士"></el-option>
              <el-option label="博士" value="博士"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="政治面貌" prop="political">
            <el-select v-model="adminDatachange.political" placeholder="请选择">
              <el-option label="群众" value="群众">群众</el-option>
              <el-option label="团员" value="团员">团员</el-option>
              <el-option label="党员" value="党员">党员</el-option>
              <el-option label="其他" value="其他">其他</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="adminDatachange.phone"></el-input>
          </el-form-item>
          <el-form-item label="毕业院校" prop="university">
            <el-input v-model="adminDatachange.university"></el-input>
          </el-form-item>
          <el-form-item label="入职时间" prop="joinTime">
            <el-date-picker v-model="adminDatachange.joinTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
          <el-form-item label="职位" prop="position">
            <el-input v-model="adminDatachange.position"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="changeShow=false">取消</el-button>
          <el-button type="primary" @click="changedata(adminDatachange)">确定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import { addAdmin } from '@/api/addUser.js'
import { show, change, dele } from '@/api/admin.js'
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
      search: {
        value: '',
        type: '',
        // state: '',
        // institute: '',
        number: '',
        name: ''
      },
      addShow: false,
      changeShow: false,
      adminData: {
        adminName: '',
        adminNumber: '',
        sex: '',
        IdCard: '',
        // state: '',
        political: '',
        phone: '',
        // institute: '',
        // class: '',
        type: '3',
        education: '',
        university: '',
        joinTime: '',
        position: ''
      },
      rule: {
        adminName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        adminNumber: [{ required: true, message: '请输入工号', trigger: 'blur' }],
        sex: [{ required: true, trigger: 'blur' }],
        IdCard: [{ required: true }],
        education: [{ required: true, trigger: 'blur' }],
        political: [{ required: true, trigger: 'blur' }],
        phone: [{ required: true, trigger: 'blur' }],
        // institute: [{ required: true, trigger: 'blur' }],
        university: [{ required: true, trigger: 'blur' }],
        joinTime: [{ required: true, trigger: 'blur' }],
        position: [{ required: true, trigger: 'blur' }]
      },
      options: [],
      tableData: [],
      adminDatachange: {
        adminName: '',
        adminNumber: '',
        sex: '',
        IdCard: '',
        political: '',
        phone: '',
        education: '',
        university: '',
        joinTime: '',
        position: ''
      },
      admindele: {
        adminNumber: ''
      }
    }
  },
  methods: {
    add(adminData) {
      addAdmin(adminData).then((res) => {
        this.search.name = ''
        this.search.number = ''
        show(this.search).then(result => {
          this.tableData = result.data
        })
        console.log(res)
        this.addShow = false
        this.adminData.adminName = ''
        this.adminData.adminNumber = ''
        this.adminData.sex = ''
        this.adminData.IdCard = ''
        // this.adminData.state = ''
        this.adminData.political = ''
        this.adminData.phone = ''
        // this.adminData.institute = ''
        // this.adminData.class = ''
        this.adminData.education = ''
        this.adminData.university = ''
        this.adminData.joinTime = ''
        this.adminData.position = ''
      })
    },
    getAdminData(search) {
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
      this.adminDatachange.adminName = this.tableData[index].adminName
      this.adminDatachange.adminNumber = this.tableData[index].adminNumber
      this.adminDatachange.sex = this.tableData[index].sex
      this.adminDatachange.IdCard = this.tableData[index].IdCard
      this.adminDatachange.political = this.tableData[index].political
      this.adminDatachange.phone = this.tableData[index].phone
      this.adminDatachange.position = this.tableData[index].position
      this.adminDatachange.education = this.tableData[index].education
      this.adminDatachange.university = this.tableData[index].university
      this.adminDatachange.joinTime = this.tableData[index].joinTime
      this.changeShow = true
    },
    handleDelete(index, row) {
      this.admindele.adminNumber = this.tableData[index].adminNumber
      dele(this.admindele).then(res => {
        console.log(res)
        if (res.data) {
          this.getAdminData(this.search)
          this.admindele.adminNumber = ''
        }
      })
    },
    changedata(data) {
      change(data).then((res) => {
        if (res.data) {
          this.getAdminData(this.search)
          this.changeShow = false
        }
      })
    }
  },
  created() {
    // getInstitute().then(res => {
    //   console.log(res)
    //   this.options = res.data
    // })
    this.getAdminData(this.search)
  }
}
</script>

<style lang="scss" scoped>
  .admin-table{
    margin-top: 40px;
  }
</style>
<style scoped>
  .el-input{
    width: 30%;
  }
</style>

