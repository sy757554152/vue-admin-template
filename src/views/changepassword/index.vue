<template>
  <div class="app-container">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="oldpass">
        <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { addnewAdmin, getUserInfo, dele } from '@/api/changepassword'
  export default {
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass')
          }
          callback();
        }
      }
      let validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        userInfo: {},
        ruleForm: {
          pass: '',
          checkPass: '',
          oldpass:'',
          number: '',
          type: ''
        },
        rules: {
          oldpass:[{ required: true, message: '请输入密码', trigger: 'blur' }],
          pass: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur',required: true }
          ]
        }
      };
    },
    methods: {
      open1() {
        this.$notify({
          title: '成功',
          message: '修改成功',
          type: 'success'
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            getUserInfo(this.token,this.ruleForm.oldpass).then(res => {
              if(res.flag){
                console.log(res)
                this.userInfo = res.data
                this.userInfo.password = this.ruleForm.pass
                // console.log(res)
                addnewAdmin(this.userInfo).then(res => {
                  if(res){
                    this.open1()
                    setTimeout(()=>{
                      this.$router.push({ path: '/' })
                    },2000)
                  }
                })
              }
            })
          } else {
            return false;
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    },
    computed: {
      ...mapGetters([
        'token'
      ])
    }
  }
</script>

<style lang="scss" scoped>
  .el-input{
    width: 50%;
  }
</style>
