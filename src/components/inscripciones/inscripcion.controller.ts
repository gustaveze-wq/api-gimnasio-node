import {Request, Response } from 'express'; 
import {Inscripcion} from '../../models/inscripcion';
import { Clase } from '../../models/clase';

//Inscribir al usuario autenticado a una clase
export const inscribirseAClase = async (req: any, res: Response) => {
    try {
        const userId =req.user.id; // Obtenemos el ID del usuario gracias al Token JWT
        const { claseId } = req.body;

        //1. Verificar si la clase existe 
        const clase = await Clase.findByPk (claseId);
        if (!clase) {
            return res.status(404).json({ message: 'la clase no fue encontrada.'});
        }

        //2. Verificar si el usuario ya está inscripto en esta clase
        const existingInscripcion = await Inscripcion.findOne({
            where: { userId, claseId }
        });

        if (existingInscripcion) {
            return res.status(400).json ({ message: 'ya esta inscripto en esta clase.'});
        }

        //3. Crear la inscripción
        const nuevaInscripcion = await Inscripcion.create({
            userId,
            claseId
        });

        return res.status(201).json({
            message: 'Inscripciòn realizada con éxito',
            inscripcion: nuevaInscripcion
        });
    }   catch (error: any) {
        console.error('Error al inscribirse a la clase:, error?.message || error');
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor al procesar la inscripcion '});
    }
};

export const getMisInscripciones = async (req: any, res: Response) => {
    try {
        const userId =req.user.id;

        const inscripciones = await Inscripcion.findAll({
            where: { userId },
        });

        return res.status(200).json(inscripciones);
    }   catch (error: any) {
        console.error('Error al obtener inscripciones:', error?.message || error);
        return res.status(500).json({ message: 'Error interno del servidor al obtener la inscripciones' });
    }
};

export const cancelarInscripcion = async (req: any, res: Response)=> {
    try{
        const userId = req.user.id;
        const { id } = req.params;

        const registroInscripcion = await Inscripcion.findByPk(id);

        if(!registroInscripcion) {
            return res.status(404).json({ message: 'La inscripción no fue encontrada'});
        }
        if (registroInscripcion.userId !== userId) {
            return res.status(403).json({ message: 'No tenés permiso para cancelar esta inscripción'});
        }

        await registroInscripcion.destroy();

        return res.status(200).json({message: 'Inscripcion cancelada con éxito' });
        }catch (error: any) {
        console.error('Error al cancelar la inscripción:', error?.message || error);
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor al cancelar la incripción'});
    }
};
