import { Request, Response } from 'express';
import { Clase } from '../../models/clase';

// 1.Obtener todas las clases
export const getClases = async (req: Request, res: Response) => {
    try {
        const clases = await Clase.findAll();
        return res.status(200).json(clases);
    }   catch (error) {
        return res.status(500).json({ message: 'Error al obtener las clases', error });
    }
};

// 2.Obtener una clase por ID
const getClaseById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const clase = await Clase.findByPk(Number(id));

        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        return res.status(200).json(clase);
    }   catch (error) {
        return res.status(500).json({ message: 'Error al obtener la clase', error });
    }
};
export { getClaseById };

// 3.Crear una nueva clase
export const createClase = async (req: Request, res: Response) => {
    try {
        const { nombre, instructor, horario, cupo } = req.body;

        //validacion basica obligatoria
        if (!nombre || !instructor || !horario || !cupo === undefined) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        
        const nuevaClase = await Clase.create({
            nombre,
            instructor,
            horario,
            cupo
        });

        return res.status(201).json(nuevaClase);
    }   catch (error) {
        return res.status(500).json({ message: 'Error al crear la clase', error });
    }
};

// 4.Actualizar una clase 
export const updateClase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { nombre, instructor, horario, cupo } = req.body;

        const clase = await Clase.findByPk(Number(id));
        
        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        await clase.update({ nombre, instructor, horario, cupo });

        return res.status(200).json({message: 'clase actualizada con exito', clase});
    }   catch (error) {
        return res.status(500).json({ message: 'Error al actualizar la clase', error });
    }           
};

// 5.Eliminar una clase
export const deleteClase = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const clase = await Clase.findByPk(Number(id));
        if (!clase) {
            return res.status(404).json({ message: 'Clase no encontrada' });
        }

        await clase.destroy();

        return res.status(200).json({ message: 'Clase eliminada con exito' });
    }   catch (error) {
        return res.status(500).json({ message: 'Error al eliminar la clase', error });
    }
};
