import { createRouter, createWebHistory } from 'vue-router'
import routes from '/@router/routes.js'
import { getAuth } from 'firebase/auth'

export const router = createRouter({
	history: createWebHistory(),
	linkActiveClass: 'active',
	routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getAuth().currentUser) {
      next()
    } else {
      alert('Log in first!')
      next('/')
    }
  } else {
    next()
  }
})