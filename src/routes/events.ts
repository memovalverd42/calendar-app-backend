/**
 * Rutas de Eventos del calendario
 * host + /api/events
*/

import express from 'express';
import { createEvent, deleteEvent, getEvents, updateEvent } from '../controllers';
import { fieldValidator, validateJWT } from '../middlewares';
import { check } from 'express-validator';
import { isDate } from '../helpers/isDate';

export const eventsRouter = express.Router();

eventsRouter.use(validateJWT);

eventsRouter.get('/', getEvents);

eventsRouter.post(
  '/',
  [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    fieldValidator
  ],   
  createEvent
);

eventsRouter.put('/:id', updateEvent);

eventsRouter.delete('/:id', deleteEvent);