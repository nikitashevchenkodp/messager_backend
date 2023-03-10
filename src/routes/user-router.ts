import { Router } from 'express';
import { userController } from '../controllers/user-controller';

const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.post('/add', userController.addUser);
userRouter.post('/addmessage', userController.addMessage);
userRouter.post('/signup', userController.registration);
userRouter.post('/login', userController.login);
userRouter.get('/:userId', userController.getUser);

export default userRouter;
