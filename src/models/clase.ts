import {DataTypes, Model } from 'sequelize'; 
import { sequelize } from '../config/database';

export class Clase extends Model {
    public id!: number;
    public nombre!: string;
    public instructor!: string;
    public horario!: string;
    public cupo!: number;
}

Clase.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        instructor: {
            type: DataTypes.STRING,
            allowNull: false
        },
        horario: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cupo: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'clases',
        timestamps: true,
    }
);