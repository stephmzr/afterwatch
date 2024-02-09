import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ResetPassword from './pages/ResetPassword';

type Route = {
  path: string;
  name: string;
  key?: string;
  component?: React.ReactNode;
  hideInMenu?: boolean;
  children?: Route[];
}

const routes: Route[] = [
  {
    path: '/users/sign_up',
    name: 'sign_up',
    component: SignUp,
  },
  {
    path: '/users/sign_in',
    name: 'sign_in',
    component: SignIn,
  },
  {
    path: '/users/reset_password',
    name: 'reset_password',
    component: ResetPassword,
    hideInMenu: true
  },
];

export default routes;