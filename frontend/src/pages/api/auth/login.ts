import type { NextApiRequest, NextApiResponse } from 'next';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_MGMT_CLIENT_ID;
  const audience = process.env.AUTH0_AUDIENCE; // Your API identifier
  const redirectUri = process.env.AUTH0_REDIRECT_URI; // Your callback URL after login

  // Construct the Universal Login URL
  const loginUrl = `https://${auth0Domain}/authorize?` +
    `client_id=${clientId}` +
    `&response_type=code` +
    `&audience=${audience}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&prompt=login`; // force login screen every time, optional

  res.redirect(loginUrl);
}
