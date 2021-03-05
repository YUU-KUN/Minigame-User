import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

// auth
import Login from '../views/auth/Login'

// layout
import Sidebar from '../views/layouts/Sidebar'

// user
import Dashboard from '../views/Dashboard'
import Transaction from '../views/Transaction'
import Cart from '../views/Cart'
import GameDetail from '../views/GameDetail'
import JoinGame from '../views/JoinGame'
import MyGame from '../views/MyGame'

Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'Login',
    components: {login: Login}
  },
  {
    path: `/joinGame`,
    name: 'JoinGame',
    component: JoinGame
  },
  {
    path: '/myGame',
    name: 'MyGame',
    components: {default: MyGame, sidebar: Sidebar},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: `/gameDetail/:gameId`,
    name: 'GameDetail',
    components: {default:GameDetail, sidebar:Sidebar},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    components: {default:Dashboard, sidebar:Sidebar},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    components: {default:Transaction, sidebar:Sidebar},
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    components: {default:Cart, sidebar:Sidebar},
    meta: {
      requiresAuth: true
    }
  },

  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  }
  else {
    next() 
  }
})

export default router
