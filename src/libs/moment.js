import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', value => {
  if (value) {
    moment.locale()
    var date = new Date(value * 1000)
    return moment(date).format('DD/MM/YYYY hh:mm:ss')
  }
})