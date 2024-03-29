/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
*/

import express from 'express';
import { loginUser, newUser, revalidateToken } from '../controllers';
import { check } from 'express-validator';
import { fieldValidator, validateJWT } from '../middlewares';

export const authRouter = express.Router();

authRouter.post(
  '/', 
  [ /* middlewares */
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
    fieldValidator
  ],
  loginUser
);
  
authRouter.post(
    '/new', 
    [ /* middlewares */
      check('name', 'El nombre es obligatorio').not().isEmpty(),
      check('email', 'El email es obligatorio').isEmail(),
      check('password', 'La contraseña debe de ser de 6 caracteres').isLength({ min: 6 }),
      fieldValidator
    ],
  newUser
);

authRouter.get(
  '/revalidate',
  validateJWT,
  revalidateToken
);
