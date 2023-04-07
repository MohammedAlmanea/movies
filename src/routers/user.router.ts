import express from 'express';
import { Login, Register, getUsers } from '../controllers/user.controller';

const router = express.Router();

router.post('/register', Register);
router.post('/login', Login);
router.get('/users', getUsers);

export default router;
