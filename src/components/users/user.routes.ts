import { Router } from "express";
import { registerUser, loginUser } from './user.controller';

const router = Router();

// Ruta para registrar un nuevo usuario: POST /api/users/register
router.post('/register', registerUser);

//Ruta para iniciar sesion:POST /api/user/register
router.post('/login', loginUser);

export default router;
