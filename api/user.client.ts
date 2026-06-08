import { BaseClient } from './base.client';

import {
  CreateUserPayload,
  UpdateUserPayload
} from "../model/user.model";

export class UserClient extends BaseClient {

  // LOGIN
  async createUser(payload: CreateUserPayload) {
    return this.post('/api/login', payload);
  }

  // GET USER DETAILS
  async getUserDetails(token: string) {

    return this.get('/api/me', {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

  }

  // UPDATE USER
  async updateUser(
    token: string,
    payload: UpdateUserPayload
  ) {

    console.log("TOKEN =>", token);

    return this.put(
      '/api/updateUser',
      payload,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    );

  }

  // DELETE USER
  async deleteUser(id: string, token: string) {

    return this.delete(`/api/${id}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });

  }

}