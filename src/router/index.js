import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import temperature from '../page/temperature'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'temperature',
      component: temperature
    }
  ]
})
