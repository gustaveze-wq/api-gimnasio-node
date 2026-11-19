import { Router } from 'express';
import { inscribirseAClase, getMisInscripciones, cancelarInscripcion } from './inscripcion.controller';
import { verifyToken } from '../../middlewares/auth.middleware';

const router = Router();

//Ruta protegida: requiere Token JWT válido para incribirse a una clase
router.post('/', verifyToken, inscribirseAClase);
router.get('/mis-inscripciones', verifyToken, getMisInscripciones);
router.delete('/:id', verifyToken, cancelarInscripcion);

export default router;
