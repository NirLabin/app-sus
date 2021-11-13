import keepPage from './apps/keep/pages/keep-page.cmp.js';
import homePage from './pages/home-page.cmp.js';
import emailApp from './apps/email/pages/email-app.cmp.js';
import emailFromKeep from './apps/email/cmps/email-from-keep.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/keep',
    component: keepPage,
  },
  {
    path: '/email',
    component: emailApp,
  },
  { path: '/fromKeep/:emailSubject/:emailBody', component: emailFromKeep },
];

export const router = new VueRouter({ routes });
