export interface User {
  id: number;
  name: string;
  email: string;
  role : string;
}

export interface CreateUserPayload {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CreateUserResponse {
  title: string;
  price: number;
  id: string;
  description: string;
  category: string;
  image: string;
  createdAt: string;
}

export interface UpdateUserPayload {
  title?: string;
  price?: number;
  description?: string;
  category?: string;
  image?: string;
}