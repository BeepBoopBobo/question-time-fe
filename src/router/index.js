import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from "../views/QuestionView.vue"
import CreateTeamView from "../views/CreateTeamView.vue"
import QuestionSelectView from "../views/QuestionSelectView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'create-team',
      component: CreateTeamView
    },
    {
      path: '/categories',
      name: 'categories',
      component: QuestionSelectView
    },
    {
      path: '/question/:id',
      name: 'question',
      component: QuestionView
    }
  ]
})

export default router
