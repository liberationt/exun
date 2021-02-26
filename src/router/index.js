import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/register')
  },
  {
    path: '/homePage',
    name: 'homePage',
    component: () => import(/* webpackChunkName: "about" */ '@/views/homePage')
  },
  {
    path: '/supermarket',
    name: 'supermarket',
    component: () => import(/* webpackChunkName: "about" */ '@/views/supermarket')
  },
  {
    path: '/supermarketDetail/:id',
    name: 'supermarketDetail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/supermarket/details')
  },
  {
    path: '/dataNavigate',
    name: 'dataNavigate',
    component: () => import(/* webpackChunkName: "about" */ '@/views/dataNavigate')
  },
  {
    path: '/userInfor',
    name: 'userInfor',
    component: () => import(/* webpackChunkName: "about" */ '@/views/userInfor')
  },
  {
    path: '/',  // 默认进入路由
    redirect: '/homePage'   //重定向
  },
]
const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {
  const queryStr = decodeURI(location.search)
  let strs =[]
  let userInfor ={}
  if (queryStr.indexOf("?") != -1) {
      var str = queryStr.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
          if(strs[i].split("=")[0]=='username'){
              userInfor.username = strs[i].split("=")[1]
              sessionStorage.setItem('userInfor',JSON.stringify(userInfor))
          }
          if(strs[i].split("=")[0]=='token'){
              setToken(strs[i].split("=")[1])
          }
      }
  }
  if(to.fullPath==='/login'){
　　　　next() 
  }else{
      if(to.matched.some( m => m.meta.auth)){
          if(getToken()){
              next()
          }else{
              next({path:'/login',query:{ Rurl: to.fullPath} })  
          }
      }else{
          next()
      }
  }
})
router.afterEach((to,from,next)=>{
  　window.scrollTo(0,0)
})
export default router
