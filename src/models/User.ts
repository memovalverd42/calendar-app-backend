import { model, Schema } from "mongoose";
import { NewUser } from "../types/types";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required']
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'The password is required']
  }
});

export const User = model<NewUser>('User', UserSchema);