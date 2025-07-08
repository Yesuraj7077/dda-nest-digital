import { Request, Response } from 'express';
import DeveloperService from '../services/DeveloperService';
import UserService from '../services/UserService';

export const getDeveloperById = async (req: Request, res: Response) => {
  try {
    console.log(req?.auth)
    const result = await DeveloperService.getDeveloperByUserId(req.params.id);
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getDevelopers = async (req: Request, res: Response) => {
  try {
    const result = await DeveloperService.getDevelopers(req.query);
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const createDeveloper = async (req: Request, res: Response) => {
  try {

    const userId = req.auth?.payload?.sub ?? '';
    const dev = await DeveloperService.createDeveloper(req.body, userId);
    res.status(201).json(dev);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

export const updateDeveloper = async (req: Request, res: Response) => {
  try {

    const dev = await DeveloperService.updateDeveloper(req.params.id, req.body);
    if(!dev){
       res.status(404).json({ message: 'Developer profile not found' });
    }
    
    res.status(200).json(dev);
  } catch (err: any) {
    res.status(403).json({ error: err.message });
  }
};

export const deleteDeveloper = async (req: Request, res: Response) => {
  try {

      const userId = req.params.id;
      
      //await UserService.deleteAuth0User(userId);
      await DeveloperService.deleteDeveloper(userId);
      res.status(204).send();
    } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};
