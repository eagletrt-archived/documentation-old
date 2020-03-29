import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BlogPost from '../views/BlogPost.vue'
import Page from '../views/Page.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/documentation/:slug',
        name: 'blog-post',
        component: BlogPost
    },
    {
        path: '/:slug',
        name: 'page',
        component: Page
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router