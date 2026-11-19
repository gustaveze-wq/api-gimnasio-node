import {Router} from 'express';
import { 
    getClases,
    getClaseById,
    createClase,
    updateClase,
    deleteClase
} from './clase.controller';
import {verifyToken} from '../../middlewares/auth.middleware';

const router = Router();

//Definimos los endpoints para el CRUD de clases
router.get('/', getClases);            // GET /api/clases
router.get('/:id', getClaseById);     // GET /api/clases/:id
router.post('/',verifyToken, createClase);         // POST /api/clases
router.put('/:id', verifyToken, updateClase);      // PUT /api/clases/:id
router.delete('/:id', verifyToken, deleteClase);   // DELETE /api/clases/:id

export default router;
