import { APIRequestContext } from '@playwright/test';

export class BaseClient {
  constructor(protected request: APIRequestContext) {}

  protected async get(endpoint: string) {
    const response = await this.request.get(endpoint);
    return response;
  }

  protected async post(endpoint: string, body: object) {
    const response = await this.request.post(endpoint, { data: body });
    return response;
  }

  protected async put(endpoint: string, body: object) {
    const response = await this.request.put(endpoint, { data: body });
    return response;
  }

  protected async delete(endpoint: string) {
    const response = await this.request.delete(endpoint);
    return response;
  }
}