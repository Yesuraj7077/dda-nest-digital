import { handleLogin } from '@auth0/nextjs-auth0/server';

export default handleLogin({
  authorizationParams: {
    scope: 'openid profile email',
    prompt: 'login',
  },
});
