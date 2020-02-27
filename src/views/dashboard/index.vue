<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <div class="content">姓名: {{ name }}</div>
      <div class="content">学号: {{ studentNumber }}</div>
      <div class="content">年级: {{ state }}</div>
      <div class="content">学院: {{ institute }}</div>
      <div class="content">专业: {{ major }}</div>
      <div class="content">班级: {{ classes }}</div>
    </div>
    <div class="title">教师评价分析</div>
    <el-row :gutter="32" class="chart">
      <el-col :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <pie-chart />
        </div>
      </el-col>
    </el-row>
<!--    <student-chart width="100%" />-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PieChart from './commponents/PieChart'
import StudentChart from './commponents/StudentChart'

export default {
  data(){
    return{
      studentNumber: ''
    }
  },
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'state',
      'token',
      'institute',
      'major',
      'classes'
    ])
  },
  components: {
    PieChart,
    StudentChart
  },
  created() {
    this.studentNumber = this.token.slice(0, this.token.length - 1)
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 20px;
    line-height: 46px;
    overflow: hidden;
    .content{
      margin-right: 20px;
      float: left;
    }
  }
}
  .chart{
    /*margin-top: 50px;*/
  }
  .title{
    width: 100%;
    margin-top: 50px;
    /*text-align: center;*/
    font-size: 20px;
    font-weight: bold;
  }
</style>
