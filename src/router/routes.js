const routes = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/', // Empty path for default child
        redirect: 'home', // Redirect to the default child route
        meta: { requiresAuth: false },
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('pages/HomePage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('pages/AboutUs.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/contact',
        name: 'Contact',
        component: () => import('pages/ContactUs.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/games',
        name: 'Games',
        component: () => import('pages/ExploreGames.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/tournaments',
        name: 'Tournaments',
        component: () => import('pages/ExploreTournaments.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/register/:id',
        name: 'Register',
        component: () => import('pages/RegisterParticipant.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/bookings',
        name: 'Bookings',
        component: () => import('pages/BookingsPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('pages/AdminPortal.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('pages/LoginUser.vue'),
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
