import keepPage from './apps/keep/pages/keep-page.cmp.js';
import homePage from './pages/home-page.cmp.js';
import mailApp from './apps/mail/pages/mail-app.cmp.js';

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
		path: '/mail',
		component: mailApp,
	},
];

export const router = new VueRouter({ routes });
