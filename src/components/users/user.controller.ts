import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user';

////Clave secreta para firmar los tokens (en un proyecto)
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_alternativo777';

// Controlador para registrar un nuevo usuario
export const registerUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //1. Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
        }

        //2. Encriptar la contraseña (hashing con bcryptjs)
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        //3. Crear el usuario en la base de datos con la contraseña encriptada
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        //4. Responder con éxito (ocultando la contraseña por seguridad)
        return res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                id: newUser.id,
                email: newUser.email,
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        return res.status(500).json({ message: 'Error interno del servidor al registrar el usuario' });
    }
};

//Controlador para iniciar sesion

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        //1. Buscar si el usuario existe en la base de datos
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado o credenciales inválidas' });
        }

        //2. Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        //3. Generar un token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        //4. Responde con exito
        return res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
        });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        return res.status(500).json({ message: 'Error interno del servidor al iniciar sesión' });
    }
};