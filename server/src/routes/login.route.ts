/** @format */

import * as express from 'express';

// middlewares
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateLoginCreds } from '../middlewares/login.middleware';

// conrollers
import { getAllUsersController, loggedInContoller, loginController } from '../controllers/login.controller';

const router = express.Router();

router.post('/login', validateLoginCreds, loginController);

router.get('/loggedIn', authMiddleware, loggedInContoller);

router.get('/users', authMiddleware, getAllUsersController);

export default router;
