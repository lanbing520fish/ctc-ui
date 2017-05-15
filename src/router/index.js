import Vue from 'vue'
import Router from 'vue-router'
import UserHome from '@/components/UserHome'
import UserList from '@/components/userList/'
import UserDetail from '@/components/userDetail/'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/user' }, {
      path: '/user',
      component: UserHome,
      redirect: '/user/list',
      children: [
        { path: '/user/list', component: UserList },
        { path: '/user/detail', component: UserDetail }
      ]
    }
  ]
})
