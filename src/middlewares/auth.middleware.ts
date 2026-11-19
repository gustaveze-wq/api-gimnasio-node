import {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secreto_alternativo777';

//Extendemos la interfaz Request de Express para que reconozca la propiedad 'user' 
export interface AuthenticatedRequest extends Request {
    user?: any; // Puedes reemplazar 'any' con el tipo de usuario que estés utilizando
}

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];

    //El token suele venir como "Bearer <token>", asi que lo separamos
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. No se proporcionó un token.' });
    }

    try {
        const verified= jwt.verify(token, JWT_SECRET);
        req.user = verified; // Guardamos los datos del usuario decodificados en la petición
        next(); // Si el token es válido, dejamos que continue hacia la ruta que queria visitar 
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
}; 