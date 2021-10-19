import Vue from 'vue'
import money from 'v-money'

Vue.use(money, {          
    decimal: ',',
    thousands: '.',
    prefix: 'R$ ',
    suffix: '',
    precision: 2,
    masked: false
})