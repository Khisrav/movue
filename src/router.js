import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('./views/HomeView.vue'),
        // meta: { requiresAuth: false }
    },
    {
        path: '/catalog',
        name: 'Catalog',
        component: () => import('./views/CatalogView.vue'),
        // meta: { requiresAuth: false }
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('./views/AboutView.vue'),
        // meta: { requiresAuth: false }
    },
    {
        path: '/movie/:id',
        name: 'Movie',
        component: () => import('./views/MovieDetailsView.vue'),
        // meta: { requiresAuth: false }
    },
    {
        path: '/restricted',
        name: 'Restricted',
        component: () => import('./views/RestrictedView.vue'),
        // meta: { requiresAuth: false }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const DEFAULT_TITLE = 'Movue';
router.afterEach((to, from, next) => {
    if (to.name != 'Movie') {
        document.title = to.name + ' - ' + DEFAULT_TITLE || DEFAULT_TITLE;
    }
});

// router.beforeEach((to, from, next) => {
//   const isAuthenticated = localStorage.getItem('token');

//   if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
//     next({ path: '/' });
//   } else if (to.path === '/' && isAuthenticated) {
//     next({ path: '/generate' });
//   } else {
//     next();
//   }
// });

export default router;
