import { createRouter, createWebHistory } from 'vue-router'
import Todos from '@/pages/Todos.vue'
import Login from '@/pages/Login.vue'
import Signup from '@/pages/Signup.vue'
import { getCookie } from '@/utils/getCookie'

const routes = [
  { path: '/', component: Todos, name: 'Todos', meta: { requiresAuth: true } },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/signup', component: Signup, name: 'Signup' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const token = getCookie('token');

  if (to.meta.requiresAuth && !token) {
    next({ name: 'Login' });
  } else {
    next();
  }
});

export default router
