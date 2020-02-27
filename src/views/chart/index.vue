<template>
  <div class="chart-container">
    <student-chart height="100%" width="100%" />
  </div>
</template>

<script>
  import StudentChart from './commponents/StudentChart'

  export default {
    name: 'std',
    components: { StudentChart }
  }
</script>

<style scoped>
  .chart-container{
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
  }
</style>

