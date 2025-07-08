import express, { Request, Response } from 'express';
import userService from '../services/UserService';
import UserService from '../services/UserService';


export async function loginUser(req: Request, res: Response){
const code: string = req.body.code as string;
console.log('Request body:', req.body);

  if (!code) {
      res.status(400).json({ message: 'Unauthorized' });
  }

  try {
    const tokens = await userService.login(code);
    res.json(tokens);
  } catch (error: any) {
     res.status(401).json({ message: 'Login failed', error: error.message });
  }
}

export const getAuth0UserInfoWithRole = async (req: Request, res: Response) => {
  try {
    const result = await UserService.getAuth0UserInfoWithRole(req.params.id);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};