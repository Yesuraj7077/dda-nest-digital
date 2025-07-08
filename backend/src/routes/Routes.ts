import * as express from 'express';

import {
  getDevelopers,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
  getDeveloperById
} from '../controllers/DeveloperController';
import { loginUser, getAuth0UserInfoWithRole } from '../controllers/UserController';
import { jwtCheck, isAdmin } from '../middleware/auth';

const router = express.Router();

router.post('/login', loginUser);
router.get('/getAuth0UserDetails/:id', jwtCheck, getAuth0UserInfoWithRole);
router.get('/developers', 
 jwtCheck,
   getDevelopers);
router.get('/developers/:id', jwtCheck, getDeveloperById);
router.post('/developers', jwtCheck, createDeveloper);
router.put('/developers/:id', jwtCheck, updateDeveloper);
router.delete('/developers/:id', jwtCheck, isAdmin,deleteDeveloper);


export default router;
