/*
 * @Author: libingbbing
 * @Date: 2021-08-26 09:28:10
 * @LastEditTime: 2021-08-26 11:07:11
 * @LastEditors: libingbbing
 * @Description:
 * @FilePath: \kvue-router\src\kvue-router\index.js
 */
// 实现简版hash router
// 实现两个组件：router-link、router-view
// 实现hash改变渲染对应的组件


// 需要使用Vue创建响应式变量,将其保存为一个模块变量
let _Vue
class KvueRouter {
  constructor(options){
    this.$options = options

    //1.保存当前hash到current
    // this.current = '/'
    // current要是响应式的  才能每次变化是重新渲染

    _Vue.util.defineReactive(this,'current','/')

    //2.监听hash变化
    window.addEventListener('hashchange',()=>{
      this.current = window.location.hash.slice(1)
    })
  }
}

KvueRouter.install = function(Vue){
  // 保存 Vue
  _Vue = Vue
  // 1.将router注册到全局,挂载到Vue原型上,所有组件通过this.$router使用
  // install会在new Vue()之前执行  要从new Vue() 时传的选项中拿到router实例  使用mixin() 方法延迟到Vue实例化后
  Vue.mixin({
    beforeCreate () {
      // 只有根组件传入router
      if(this.$options.router){
        //此处this 为组件实例
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  //注册router-link组件
  Vue.component('router-link',{
    props: {
      to: {
        type: String,
        required:true
      },
    },
    render(h){
      return h('a',{
        attrs:{
          href:'#'+this.to
        }
      },this.$slots.default)
    }
  })

  //注册router-view组件
  Vue.component('router-view',{
    render(h){
      // 从路由表中匹配当前hash对应的路由的component
      let component = null
      const current = this.$router.current
      const route = this.$router.$options.routes.find(route=>route.path === current)
      if(route){
        component = route.component
      }
      return h(component)
    }
  })
}

export default KvueRouter