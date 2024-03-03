export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface IEvent {
  _id?: string;
  title: string;
  notes?: string;
  start: Date;
  end: Date;
  user: IUser;
}

export interface IUser {
  uid: string;
  name: string;
}
