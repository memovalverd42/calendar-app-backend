import { CustomValidator, Meta } from 'express-validator';
import moment from 'moment';

export const isDate: CustomValidator = ( input: any, { req, location, path }: Meta  ) => {
  
  if( !input ){
    return false;
  }

  const date = moment(input);
  return date.isValid();

}