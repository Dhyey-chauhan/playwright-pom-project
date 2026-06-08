import { test, expect } from '@playwright/test';
import { UserClient } from '../../api/user.client';

test.describe.configure({ mode: 'serial' });

let authToken: string;
let userId: string;
let userEmail: string;

test.beforeAll(async ({ request }) => {

  console.log("execution started");

  userEmail = `dhyey${Date.now()}@gmail.com`;

  // REGISTER USER
  await request.post('/api/register', {
    data: {
      firstname: "Dhyey",
      lastname: "Chauhan",
      email: userEmail,
      password: "dhyey@123"
    }
  });

  // LOGIN USER
  const loginResponse = await request.post('/api/login', {
    data: {
      email: userEmail,
      password: "dhyey@123"
    }
  });

  const loginBody = await loginResponse.json();

  authToken = loginBody.user.token;
  userId = loginBody.user._id;

});

test.afterAll(() => {
  console.log("execution completed");
});


// LOGIN TEST
test('POST - login user successfully', async () => {

  expect(authToken).toBeDefined();

  expect(userId).toBeDefined();

});


// GET USER DETAILS
test('GET - fetch logged-in user details', async ({ request }) => {

  const userClient = new UserClient(request);

  const response = await userClient.getUserDetails(authToken);

  const body = await response.json();

  JSON.stringify(body, null, 2)

  expect(response.status()).toBe(200);

});


// UPDATE USER
// test('PUT - update user details', async ({ request }) => {

//   const userClient = new UserClient(request);

//   const response = await userClient.updateUser(
//     authToken,
//     {
//       firstname: `Dhyey${Date.now()}`,
//       lastname: 'Updated',
//       phonenumber: `${Math.floor(Math.random() * 10000000000)}`
//     }
//   );

//   console.log('PUT STATUS =>', response.status());

//   const body = await response.json();

//   console.log(JSON.stringify(body, null, 2));

//   expect(response.status()).toBe(200);

// });


// DELETE USER
test('DELETE - delete user', async ({ request }) => {

  const userClient = new UserClient(request);

  const response = await userClient.deleteUser(
    userId,
    authToken
  );

  const body = await response.json();

  JSON.stringify(body, null, 2)

  expect(response.status()).toBe(200);

});


// BONUS ASSERTION
test('BONUS - reuse stored values', async () => {

  expect(authToken).toBeDefined();

  expect(userId).toBeDefined();

});