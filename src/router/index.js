import Vue from 'vue'
import Router from 'vue-router'
import UserHome from '@/components/UserHome'
import UserList from '@/components/userList/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/user' }, {
      path: '/user',
      component: UserHome,
      redirect: '/user/list',
      children: [
        { path: '/user/list', component: UserList }
      ]
    }
  ]
})
