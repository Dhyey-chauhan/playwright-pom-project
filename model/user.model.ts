export interface User {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  addresses?: any[];
  orders?: any[];
  __v?: number;
}

export interface CreateUserPayload {
  email: string;
  password: string;
}

export interface CreateUserResponse {
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    addresses: any[];
    orders: any[];
    __v: number;
    token: string;
  };
}

export interface UpdateUserPayload {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}
