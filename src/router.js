import Vue from 'vue'
import Router from 'vue-router'
import Cat from './views/Cat.vue'
import Scores from './views/Scores.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'cat',
      component: Cat
    },
    {
      path: '/scores',
      name: 'scores',
      component: Scores
    }
  ]
})
