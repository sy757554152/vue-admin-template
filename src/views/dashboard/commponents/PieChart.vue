<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import { mapGetters } from 'vuex'
import { getCircleData } from '@/api/echarts'
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },
  data() {
    return {
      chart: null,
      value: [
        { value: 0, name: '未评价' },
        { value: 0, name: '1分' },
        { value: 0, name: '2分' },
        { value: 0, name: '3分' },
        { value: 0, name: '4分' },
        { value: 0, name: '5分' }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  mounted() {
    getCircleData(this.token.slice(0, this.token.length - 1)).then(res => {
      // console.log(res)
      // console.log(this.value);
      const list = res.data
      for (let i = 0; i < list.length; i++) {
        if (list[i].teacherscore === '') {
          this.value[0].value++
        } else if (list[i].teacherscore == '1') {
          this.value[1].value++
        } else if (list[i].teacherscore === '2') {
          this.value[2].value++
        } else if (list[i].teacherscore === '3') {
          this.value[3].value++
        } else if (list[i].teacherscore === '4') {
          this.value[4].value++
        } else if (list[i].teacherscore === '5') {
          this.value[5].value++
        }
        // console.log(this.value)
      }
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')
      // console.log(this.value)
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['未评价', '1分', '2分', '3分', '4分', '5分']
        },
        series: [
          {
            name: '教师评价分数',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: this.value,
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      })
    }
  }
}
</script>
