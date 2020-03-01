// Layout
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutBasic from '../layouts/LayoutBasic';

// Admin Pages
import AdminHome from '../pages/Admin';
import AdminSingIn from '../pages/Admin/SignIn';
import AdminUsers from '../pages/Admin/Users';

// Pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';

// Otros
import NotFound from '../pages/NotFound';

const routes = [{
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
        { path: "/admin", component: AdminHome, exact: true },
        { path: "/admin/login", component: AdminSingIn, exact: true },
        { path: "/admin/users", component: AdminUsers, exact: true },
        { path: "**", component: NotFound }
    ]
},
{
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
        { path: "/", component: Home, exact: true },
        { path: "/contact", component: Contact, exact: true },
        { path: "**", component: NotFound }
    ]
}
];

export default routes;