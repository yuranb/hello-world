import Registry from '../pages/registry';
import Login from '../pages/login'
import Home from '../pages/home'
import History from '../pages/history'
const routes = [
  {
    path:'/',
    element:Home
  },
  {
    path:'/home',
    element:Home
  },
  {
    path:'/registry',
    element:Registry
  },
  {
    path:'/login',
    element:Login
  },
  {
    path:'/history',
    element:History
  }
]

export default routes;