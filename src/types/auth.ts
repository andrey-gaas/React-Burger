export interface IUser {
  user: null | {
    email: string;
    name: string;
  };
}

export interface IAuth {
  user: IUser;
  loading: {
    registration: boolean;
    login: boolean;
    user: boolean;
    update: boolean;
  };
  errors: {
    registration: boolean;
    login: boolean;
    user: boolean;
    update: boolean;
  };
}
