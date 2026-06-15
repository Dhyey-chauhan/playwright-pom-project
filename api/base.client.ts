import { APIRequestContext } from '@playwright/test';

export class BaseClient {

  constructor(protected request: APIRequestContext) {}

  protected async get(endpoint: string, options?: any) {
    return await this.request.get(endpoint, options);
  }

  protected async post(
    endpoint: string,
    body: object,
    options?: any
  ) {

    return await this.request.post(endpoint, {
      data: body,
      ...options
    });

  }

  protected async put(
    endpoint: string,
    body: object,
    options?: any
  ) {

    return await this.request.put(endpoint, {
      data: body,
      ...options
    });

  }

  protected async delete(endpoint: string, options?: any) {
    return await this.request.delete(endpoint, options);
  }

}