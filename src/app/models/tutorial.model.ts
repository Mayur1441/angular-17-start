export class Tutorial {
  id?: any;
  title?: string;
  description?: string;
  to_lat?: string;
  to_lang?: string;
  from_lat?: string;
  from_lang?: string;
  distance?: string;
  fare?: string;
  to?: string;
  from?: string;
  published?: boolean;
  taken?: boolean;
  complete?: boolean;
  user?: [{
    createdAt: string;
    email: string;
    mobile: string;
    firstname: string;
    lastname: string;
    password: string;
    roles: object;
    updatedAt: string;
    username: string;
    _id: string;
  }];
  driver?: object;
  createdAt?: string;
  updatedAt?: string;
}
