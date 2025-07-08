/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    APPLICATION_URL: process.env.APPLICATION_URL || 'http://localhost:5000',
    CLIENT_API_URL: process.env.CLIENT_API_URL || 'http://localhost:5000',
    AUTH0_SECRET: process.env.AUTH0_SECRET,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_AUDIENCE_IDENTIFIER: process.env.AUTH0_AUDIENCE_IDENTIFIER,
    AUTH0_MGMT_CLIENT_ID: process.env.AUTH0_MGMT_CLIENT_ID,
    AUTH0_MGMT_CLIENT_SECRET: process.env.AUTH0_MGMT_CLIENT_SECRET,
    AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE,
    AUTH0_REDIRECTURI: process.env.AUTH0_REDIRECT_URI,
    API_URL: process.env.API_URL || 'http://localhost:5000/api',
  },

};
