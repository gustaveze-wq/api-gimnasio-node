import {DataTypes, Model, Optional} from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user';
import { Clase } from '../models/clase';


interface InscripcionAttributes {
    id?: number;
    userId: number;
    claseId: number;
}

interface InscripcionCreationAttributes extends Optional<InscripcionAttributes, 'id'> {}

export class Inscripcion extends Model<InscripcionAttributes, InscripcionCreationAttributes> implements InscripcionAttributes {
    declare id: number;
    declare userId: number;
    declare claseId: number;

    declare readonly createdAt: Date;
    declare readonly updatedAt: Date;
}

Inscripcion.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id',
            },
        },
        claseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Clase,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'inscripciones',
    }
);

// Definimos las relaciones (Associations)
User.belongsToMany(Clase, { through: Inscripcion, foreignKey: 'userId' });
Clase.belongsToMany(User, { through: Inscripcion, foreignKey: 'claseId' });

