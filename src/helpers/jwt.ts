import { sign } from "jsonwebtoken";

/**
 * Función para generar un JWT
 * @param uid ID del usuario
 * @param name Nombre del usuario
 * @returns Promise<string>
 */
export const generateJWT = ( uid: string, name: string ): Promise<string> => {

  return new Promise( (resolve, reject) => {

    const payload = { uid, name };

    sign( payload, process.env.SECRET_JWT_SEED!, {
      expiresIn: '2h',
    }, (err, token) => {
      if ( err ) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        resolve( token! );
      }
    });

  });

}

