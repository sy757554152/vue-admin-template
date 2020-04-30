import Vue from 'vue'
import Router from 'vue-router'
import { store } from '@/store/index'
import Cookies from 'js-cookie'
import { getToken, setToken, removeToken, setType, removeType } from '@/utils/auth'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
    meta: { roles: 'all' }
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true,
    meta: { roles: 'all' }
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'Dashboard', icon: 'dashboard', roles: 'all' }
    }]
  },

  {
    path: '/input',
    component: Layout,
    meta: { title: '信息查询录入', roles: 'admin' },
    children: [
      {
        path: '/student',
        name: 'student',
        component: () => import('@/views/input/student'),
        meta: { title: '学生信息查询录入', roles: 'admin' }
      },
      {
        path: '/teacher',
        name: 'teacher',
        component: () => import('@/views/input/teacher'),
        meta: { title: '教师信息查询录入', roles: 'admin' }
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('@/views/input/admin'),
        meta: { title: '管理员信息查询录入', roles: 'admin' }
      }
    ]
  },
  {
    path: '/homeworkdesign',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'homeworkdesign',
        component: () => import('@/views/homeworkdesign/index'),
        meta: { title: '作业设计', icon: 'form', roles: 'teacher' }
      }
    ]
  },
  {
    path: '/viewhomework',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'viewhomework',
        component: () => import('@/views/viewhomework/index'),
        meta: { title: '查看作业', icon: 'tree', roles: 'student' }
      }
    ]
  },
  {
    path: '/comment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'comment',
        component: () => import('@/views/comment/index'),
        meta: { title: '作业互评', icon: 'table', roles: 'student' }
      }
    ]
  },
  {
    path: '/teachercomment',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'teachercomment',
        component: () => import('@/views/teachercomment/index'),
        meta: { title: '工作过程监控与评价', icon: 'table', roles: 'teacher' }
      }
    ]
  },
  {
    path: '/studentview',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'studentview',
        component: () => import('@/views/studentview/index'),
        meta: { title: '查看老师评价', icon: 'example', roles: 'student' }
      }
    ]
  },
  {
    path: '/chart',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'chart',
        component: () => import('@/views/chart/index'),
        meta: { title: '成绩分析', icon: 'example', roles: 'student' }
      }
    ]
  },
  {
    path: '/changepassword',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'changepassword',
        component: () => import('@/views/changepassword/index'),
        meta: { title: '修改密码', icon: 'example', roles: 'all' }
      }
    ]
  },
  {
    path: '/noroles',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'noroles',
        component: () => import('@/views/noroles/index'),
        hidden: true,
        meta: { title: '无权限页', icon: 'example', roles: 'all' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true, meta: { roles: 'all' }}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const whiteList = ['/login']

const TokenKey = 'vue_admin_template_token'
const token = Cookies.get(TokenKey)
// console.log(a)
router.beforeEach((to, from, next) => {
  // to: 即将要进入的目标 [路由对象]
  // from:当前导航正要离开的路由
  // next:一定要调用该方法来 resolve 这个钩子
  // console.log(to.meta.roles.length)
  // console.log(to.path)
  const type = getToken()
  if (to.path === '/noroles/index') {
    next()
  }
  if (to.meta.roles === 'all') {
    // console.log('3')
    next()
  } else if (type == '1') {
    if (to.meta.roles == 'student') {
      next()
    } else {
      next({ path: '/noroles/index' })
    }
  } else if (type == '2') {
    if (to.meta.roles === 'teacher') {
      // console.log('1')
      next()
    } else {
      // console.log('2')
      next({ path: '/noroles/index' })
    }
  } else if (type == '3') {
    if (to.meta.roles === 'admin') {
      next()
    } else {
      next({ path: '/noroles/index' })
    }
  } else {
    next({ path: '/login' })
  }

  // if (hasToken) {
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //   } else {
  //     next()
  //   }
  // }else {
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     next()//这里是即将进入的页面是白名单的页面就直接进入
  //   } else {
  //     next({ path: '/login' })//这里是即将进入的页面不是白名单的页面又没有token的情况下重定向到登录页面进行登录操作
  //   }
  // }
})

export default router
