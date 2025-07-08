import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';
export default function logout(req: NextApiRequest, res: NextApiResponse) {
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_MGMT_CLIENT_ID;
  const postLogoutRedirectUri = process.env.AUTH0_POST_LOGOUT_REDIRECT_URI; // URL after logout

  // Construct the logout URL
  const logoutUrl = `https://${auth0Domain}/logout?` +
    `client_id=${clientId}` +
    `&returnTo=${encodeURIComponent(postLogoutRedirectUri)}`;

      res.setHeader('Set-Cookie', serialize('access_token', '', {
    httpOnly: true,
    path: '/',
    expires: new Date(0),
  }));
  res.redirect(logoutUrl);
}
