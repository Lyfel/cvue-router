/*
 * @Author: libingbbing
 * @Date: 2021-08-26 09:29:27
 * @LastEditTime: 2021-08-27 15:43:05
 * @LastEditors: libingbbing
 * @Description:
 * @FilePath: \kvue-router\src\router\index.js
 */
import KvueRouter from '../cvue-router/index'
import Vue from 'vue'

import Home from '@/components/Home'
import About from '@/components/About'

Vue.use(KvueRouter)

const routes = [
  {
    path:'/',
    name:'Home',
    component:Home,
  },
  {
    path:'/about',
    name:'About',
    component:About
  }
]

export default new KvueRouter({
  routes
})
