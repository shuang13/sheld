import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Upload from '@/components/Upload'
import Result from '@/components/Result'
import Detail from '@/components/Detail'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [{
      	path: '/upload',
      	name: 'Upload',
      	component: Upload
      },{
      	path: '/result',
      	name: 'Result',
      	component: Result
      },{
        path: '/detail',
        name: 'Detail',
        component: Detail
      }]
    }
  ]
})
