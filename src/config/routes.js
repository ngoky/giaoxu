const routes = [
  // {
  //   path: '/',
  //   redirect: '/dashboard',
  //   authority: [OWNER],
  // },
  {
    path: '/',
    redirect: '/home',
    // authority: [EMPLOYEE],
  },
  {
    path: '/signin-google',
    component: './SignupGoogle',
    routes: [
      {
        path: '/signin-google',
        component: './SignupGoogle',
      },
    ],
  },
  {
    path: '/login',
    component: '../layouts/AuthLayout',
    routes: [
      {
        path: '/login',
        component: './Login',
      },
    ],
  },
  {
    path: '/signup',
    component: '../layouts/SignUpLayout1',
    routes: [
      {
        path: '/signup',
        component: './SignUp1',
      },
    ],
  },
  {
    path: '/signup-verify',
    component: '../layouts/SignUpLayout1',
    routes: [
      {
        path: '/signup-verify',
        component: './SignUp2',
      },
    ],
  },
  {
    path: '/signup-configlocation',
    component: '../layouts/SignUpLayout2',
    routes: [
      {
        path: '/signup-configlocation',
        component: './SignUpConfigLocation',
      },
    ],
  },
  {
    path: '/candidate',
    component: '../layouts/TerralogicCandidateLoginLayout',
    routes: [
      {
        path: '/candidate',
        component: './Login',
      },
    ],
  },
  {
    path: '/forgot-password',
    component: '../layouts/AuthLayout',
    routes: [
      {
        path: '/forgot-password',
        component: './ForgotPassword',
      },
    ],
  },
  {
    path: '/reset-password/:reId',
    component: '../layouts/AuthLayout',
    routes: [
      {
        path: '/reset-password/:reId',
        component: './ResetPassword',
      },
    ],
  },
  {
    path: '/active-user/:id',
    component: '../layouts/ActiveUserLayout',
    routes: [
      {
        path: '/active-user/:id',
        component: './ActiveUser',
      },
    ],
  },
  {
    path: '/candidate-by-link/:tokenId',
    routes: [
      {
        path: '/candidate-by-link/:tokenId',
        component: './CandidateLink',
      },
    ],
  },
  {
    path: '/first-change-password',
    component: '../layouts/AccountSetupLayout',
    routes: [
      {
        path: '/first-change-password',
        component: './FirstChangePassword',
      },
    ],
  },
  {
    path: '/candidate-portal',
    redirect: '/candidate-portal/dashboard',
  },
  {
    component: './404',
  },
];
export default routes;
