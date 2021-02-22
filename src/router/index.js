import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

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

Vue.use(VueRouter)


const routes = [

  // user
  // {
  //   path: `/theTempleOfRiddle`,
  //   name: 'theTempleOfRiddle',
  //   component: theTempleOfRiddle
  // },
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
    path: `/gameDetail/:gameId`,
    name: 'GameDetail',
    components: {default:GameDetail, sidebar:Sidebar},
    meta: {
      requiresAuthUser: true
    }
  },
  {
    path: '/',
    name: 'Dashboard',
    components: {default:Dashboard, sidebar:Sidebar},
    meta: {
      requiresAuthUser: true
    }
  },
  {
    path: '/transaction',
    name: 'Transaction',
    components: {default:Transaction, sidebar:Sidebar},
    meta: {
      requiresAuthUser: true
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    components: {default:Cart, sidebar:Sidebar},
    meta: {
      requiresAuthUser: true
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

export default router
