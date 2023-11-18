import { createRouter, createWebHistory } from 'vue-router'
import QuestionView from "../views/QuestionView.vue"
import ManageTeamsView from "../views/ManageTeamsView.vue"
import ManageCategoriesView from "../views/ManageCategoriesView.vue"
import QuestionSelectView from "../views/QuestionSelectView.vue"
import HowToPlayView from "../views/HowToPlayView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'how-to',
      component: HowToPlayView
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
    },
    {
      path: '/categories',
      name: 'categories',
      component: QuestionSelectView
    },
    {
      path: '/manage-categories',
      name: 'manage-categories',
      component: ManageCategoriesView
    },
    {
      path: '/manage-teams',
      name: 'manage-teams',
      component: ManageTeamsView
    }
  ]
})

export default router
