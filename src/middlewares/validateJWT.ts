import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  uid: string;
  name: string;
  iat: number;
  exp: number;
}

export const validateJWT = (req: Request, res: Response, next: NextFunction) => {

  const token = req.header('x-token');

  if(!token){
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'
    });
  }

  try {
    
    const { name, uid } = verify( token, process.env.SECRET_JWT_SEED! ) as IPayload;
    req.body.uid = uid;
    req.body.name = name;

  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

  next();
}