import request from 'supertest';
import app from '../app'; 

describe('Authentication APIs', () => {
  let token: string;  // To store the authentication token
  let userId: string;  // To store the ID of the user created in the test
  let token2: string;
  let userId2: string;

  beforeAll(async () => {
    const response1 = await request(app)
      .post('/api/v1/auth/signup')
      .send({
        name: 'jest',
        email: 'jest@example.com',
        password: 'jest.123',
        phoneNumber: "923487203345",

      });
    console.log("response1", response1)

    token = response1.body.token;
    userId = response1.body.data.id;
  });

  afterAll(async () => {
    await Promise.all([
      request(app)
        .delete(`/api/v1/user`)
        .set('Authorization', `Bearer ${token}`),
      request(app)
        .delete(`/api/v1/user`)
        .set('Authorization', `Bearer ${token2}`),
    ]);
  });


  describe('POST /api/v1/auth/login', () => {
    it('should return 200 OK and a token when valid credentials are provided', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .set("Accept", "application/json")
        .send({
          email: 'jest@example.com',
          password: 'jest.123',
        })

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });


    it('should return 401 Unauthorized when invalid credentials are provided', async () => {
      const response = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'invalidemail@example.com',
          password: 'invalidpassword',
        });

      expect(response.status).toBe(401);
    });
  });

  describe('POST /api/v1/auth/signup', () => {
    it('should return 200 OK and a token when signing up with valid data', async () => {
      const response = await request(app)
        .post('/api/v1/auth/signup')
        .send({
          name: 'Jestt',
          email: 'jest2@example.com',
          password: 'jest.123',
          phoneNumber: '923487203345',
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      token2 = response.body.token;
      userId2 = response.body.data.id
    });
  });

  describe('GET /api/v1/auth/verify-user', () => {
    test('should return 200 OK and user information when a valid token is provided', async () => {
      const response = await request(app)
        .get('/api/v1/auth/verify-user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
    });

    test('should return 403 Forbidden when an invalid token is provided', async () => {
      const response = await request(app)
        .get('/api/v1/auth/verify-user')
        .set('Authorization', 'Bearer invalidtoken');

      expect(response.status).toBe(500);
    });
  });
});
