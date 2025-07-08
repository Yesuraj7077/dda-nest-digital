// src/middleware/auth.ts
import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import express, { Request, Response, NextFunction  } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import DeveloperModel, { Developer } from '../models/Developer';
console.log('Auth0 Domain:', process.env.AUTH0_AUDIENCE);


export const jwtCheck: express.RequestHandler = auth({
  audience: process.env.AUTH0_AUDIENCE!,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN!}/`,
  tokenSigningAlg: 'RS256',
});
console.log('JWT Check Middleware Initialized');

export const checkOwnership = async (req:Request, res:Response, next:any) => {
  const dev = await DeveloperModel.findById(req.params.id);
  if (!dev) return res.status(404).send('User Not found');
  if (dev.userId !== req?.auth?.payload?.sub) return res.status(403).send('Unauthorized');
  next();
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const roles = req.auth?.payload?.[`https://${process.env.AUTH0_DOMAIN!}/` + 'roles'] as string[] | undefined;

  if (!Array.isArray(roles) || !roles.includes('admin')) {
     res.status(403).json({ message: 'Access denied. Admins only.' });
  }

  next();
};
