import { test, expect } from '@playwright/test';
import { UserClient } from '../../api/user.client';
import { CreateUserResponse } from '../../model/user.model';     

test.describe.configure({mode: 'serial'});
let userClient: UserClient;
let createdUserId: string;

// Initialize UserClient before all tests // use of thebeforeeach hook - so it will run before each test-case.
test.beforeEach(({ request }) => {
  userClient = new UserClient(request);
  console.log("execution started");
});

// Cleanup after all tests
test.afterEach(({ request }) => {
  console.log("execution completed");
});


//  GET REQUESTS
test('GET - fetch users list', async () => {
  const response = await userClient.getUsers();
  console.log(response);
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body).toBeDefined();
  expect(body.length).toBeGreaterThan(0);
});


//  POST REQUESTS
test('POST - create user and store ID', async () => {
  const response = await userClient.createUser({
    title: 'Rahul Sharma',
    price: 100,
    description: 'Updated description',
    category: 'electronics',
    image: 'https://i.pravatar.cc'
  });
  const body: CreateUserResponse = await response.json();


  expect(response.status()).toBe(201);
  expect(body.title).toBe('Rahul Sharma');
  expect(body.price).toBe(100);
  expect(body.id).toBeDefined();

  // BONUS: store for reuse
  createdUserId = body.id;
  console.log(`Created user ID: ${createdUserId}`);
});

//  PUT REQUEST
test('PUT - update user', async () => {
  const response = await userClient.updateUser(21, {
    title: 'Updated Name',
    price: 150,
    description: 'Updated description',
    category: 'electronics',
    image: 'https://i.pravatar.cc'
  });
  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.title).toBe('Updated Name');
  expect(body.price).toBe(150);
});

// DELETE REQUEST
test('DELETE - delete user', async () => {
  const response = await userClient.deleteUser(2);
  expect(response.status()).toBe(200);
});

//  chain data across tests 
test('BONUS - reuse createdUserId in assertion', async () => {
  // createdUserId was set in the POST test above
  console.log(`Reusing created user ID: ${createdUserId}`);
  expect(createdUserId).toBeDefined();
});