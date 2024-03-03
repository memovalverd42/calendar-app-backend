import express from 'express';
import { dbConection } from './database/config';
import cors from 'cors';
import { authRouter, eventsRouter } from './routes';
require('dotenv').config();

// Crear el servidor de express
export const app = express();

// Base de datos
dbConection();

// CORS
app.use( cors() )

// Directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', authRouter);     // Rutas de autenticación
app.use('/api/events', eventsRouter); // Rutas de eventos

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log("Server is running on port 4000");
});
