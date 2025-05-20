import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListView from '../views/ListView.vue'
import AboutView from '../views/AboutView.vue' 
import BookView from '../views/BookView.vue'
import LibraryView from '../views/LibraryView.vue'
import NewLibrary from '@/views/NewLibrary.vue'
import EditLibrary from '@/views/EditLibrary.vue'
import UserView from '../views/user/UserView.vue'
import RegisterView from '../views/user/RegisterView.vue'
import LoginView from '../views/user/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Home Page'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Login'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Register'
      }
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
      meta: {
        title: 'User Panel'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'About Page'
      }
    },
    {
      path: '/list',
      name: 'list',
      component: ListView,
      meta: {
        title: 'List'
      }
    },
    {
      path: '/book/:id',
      name: 'book',
      component: BookView,
      meta: {
        title: 'Book'
      }
    },
    {
      path: '/library',
      name: 'library',
      component: LibraryView,
      meta: {
        title: 'Libraries'
      }
    },
    {
      path: '/library/new',
      name: 'new-library',
      component: NewLibrary,
      meta: {
        title: 'New Library'
      }
    },
    {
      path: '/library/:id',
      name: 'edit-library',
      component: EditLibrary,
      meta: {
        title: 'Edit Library'
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/'
    }
  ],
})

router.beforeEach((to, from, next) => {
  if(to.meta) {
    document.title = `${to.meta.title} :: Library`
  }

  next()
})

export default router
