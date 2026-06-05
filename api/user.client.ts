import { BaseClient } from './base.client';
import { CreateUserPayload, UpdateUserPayload } from "../model/user.model";

export class UserClient extends BaseClient {

  async getUsers(page = 1) {
    return this.get(`/products`);
  }

  async createUser(payload: CreateUserPayload) {
    return this.post('/products', payload);
  }

  async updateUser(id: number, payload: UpdateUserPayload) {
    return this.put(`/products/${id}`, payload);
  }

  async deleteUser(id: number) {
    return this.delete(`/products/${id}`);
  }
}