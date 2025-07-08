import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import qs from 'querystring';
import * as cookie from 'cookie'
import { exit } from 'process';

export default async function callback(req: NextApiRequest, res: NextApiResponse) {
  const code = req.query.code as string;
  const auth0Domain = process.env.AUTH0_DOMAIN;
  const clientId = process.env.AUTH0_MGMT_CLIENT_ID;
  const redirectUri = process.env.AUTH0_REDIRECT_URI;
  const clientSecret = process.env.AUTH0_MGMT_CLIENT_SECRET;
  const audience = process.env.AUTH0_AUDIENCE;

  if (!code) {
    res.status(400).send('Code not provided');
    return;
  }

  try {
   const tokenResponse = await axios.post(
      `https://${auth0Domain}/oauth/token`,
      qs.stringify({
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        audience:audience,
        redirect_uri: redirectUri,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const { access_token, id_token } = tokenResponse.data;
    
    
    res.setHeader('Set-Cookie', cookie.serialize('access_token', access_token, {
      httpOnly: false, 
      secure: process.env.NODE_ENV === 'development', 
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    }));

   res.redirect('/');
  
   return 1;

  } catch (error) {
    console.error(error);
    res.status(500).send('Authentication failed');
  }
}
