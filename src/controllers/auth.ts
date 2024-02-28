import { Request, Response } from "express";
import { User } from "../models/User";
import { LoginUser, NewUser } from "../types/types";
import { MongooseError } from "mongoose";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import { generateJWT } from "../helpers/jwt";

export const newUser = async(req: Request, res: Response) => {

  try{

    let user = await User.findOne({ email: req.body.email});
    if(user){
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }
    
    user = new User(req.body as NewUser);
    
    // Encriptar contraseña
    const salt = genSaltSync();
    user.password = hashSync( user.password, salt );
    
    await user.save();

    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });

  } catch (error: MongooseError | any) {

    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor contacte al administrador'
    });

  }

}

export const loginUser = async(req: Request, res: Response) => {
  
  const { email, password } = req.body as LoginUser;

  try {

    let user = await User.findOne({ email });
    if( !user ){
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese correo'
      });
    }

    const validPassword = compareSync( password, user.password );
    if( !validPassword ){
      return res.status(400).json({
        ok: false,
        msg: 'Contraseña incorrecta'
      });
    }

    const token = await generateJWT(user.id, user.name);
    
    res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });

  } catch (error: MongooseError | any) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor contacte al administrador'
    });
  }


}

export const revalidateToken = async(req: Request, res: Response) => {

  const { uid, name } = req.body;

  const token = await generateJWT( uid, name );

  res.json({
    ok: true,
    name,
    uid,
    token
  });

}