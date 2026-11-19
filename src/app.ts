import 'dotenv/config';
import express from 'express';
import { sequelize } from './config/database';

//importamos los modelos para que Sequelize los registre
import './models/clase';
import './models/user';
import userRoutes from './components/users/user.routes';
// Importamos el modelo de inscripcion para que Sequelize lo registre
import './models/inscripcion'; 
//Importamos las rutas de clases
import claseRoutes from './components/clases/clase.routes';

import inscripcionRoutes from './components/inscripciones/inscripcion.routes';

const app = express();
const PORT = process.env.PORT || 3000;

//middlewares globales
app.use(express.json());

//Ruta inicial de prueba
app.get('/', (req, res) => {
    res.send('API está funcionando correctamente');
});

//Resgistramos las rutas de API bajo el prefijo /api/clases
app.use('/api/clases', claseRoutes);
app.use('/api/users', userRoutes);   
app.use('/api/inscripciones', inscripcionRoutes);

//Funcion para iniciar la base de datos y el servidor
const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión a PostgreSQL establecida con exito.');

        //Sincroniza las tablas con la base de datos(force: false para no borrar datos existentes)
        await sequelize.sync({ force: false });
        console.log('Modelos sincronizados correctamente con la base de datos.');

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
    }
};

startServer();