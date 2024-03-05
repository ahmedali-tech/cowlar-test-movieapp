import request from 'supertest';
import app from '../app';

describe('Movie APIs', () => {
    let userToken: string;
    let userId: string;
    let userToken2: string;
    let userId2: string;
    let movie1: string;
    let movie2: string;

    beforeAll(async () => {
        // Create the first user
        const response1 = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                name: 'jestuser',
                email: `jestuser${Math.floor(Math.random() * 9999) + 1}@example.com`,
                password: 'jestuser1pass',
                phoneNumber: '923487203366',
            });

        userToken = response1.body.token;
        userId = response1.body.data.id;

        // Create the second user
        const response2 = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                name: 'jestuserr',
                email: `jestuser${Math.floor(Math.random() * 99999) + 1}@example.com`,
                password: 'jestuser2pass',
                phoneNumber: '923487203388',
            });

        userToken2 = response2.body.token;
        userId2 = response2.body.data.id;
    });

    afterAll(async () => {
        // Delete the first user's movies
        const movies1 = await request(app)
            .get('/api/v1/movies/own')
            .set('Authorization', `Bearer ${userToken}`);

        if (movies1.body.data.length > 0) {
            await Promise.all(
                movies1.body.data.map((movie: { _id: any; }) =>
                    request(app)
                        .delete(`/api/v1/movies/${movie._id}`)
                        .set('Authorization', `Bearer ${userToken}`)
                )
            );
        }

        // Delete the first user
        await request(app)
            .delete(`/api/v1/user`)
            .set('Authorization', `Bearer ${userToken}`);

        // Delete the second user's movies
        const movies2 = await request(app)
            .get('/api/v1/movies/own')
            .set('Authorization', `Bearer ${userToken2}`);

        if (movies2.body.data.length > 0) {
            await Promise.all(
                movies2.body.data.map((movie: { _id: any; }) =>
                    request(app)
                        .delete(`/api/v1/movies/${movie._id}`)
                        .set('Authorization', `Bearer ${userToken2}`)
                )
            );
        }

        // Delete the second user
        await request(app)
            .delete(`/api/v1/user`)
            .set('Authorization', `Bearer ${userToken2}`);
    });

    describe('POST /api/v1/movies', () => {
        it('should create a new movie for the first user', async () => {
            const response = await request(app)
                .post('/api/v1/movies')
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    name: `Movie ${Math.floor(Math.random() * 9999) + 1}`,
                    description: 'A great movie',
                    releaseYear: "2022",
                    genre: 'drama',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');

            movie1 = response.body.data._id;
        });

        it('should create a new movie for the second user', async () => {
            const response = await request(app)
                .post('/api/v1/movies')
                .set('Authorization', `Bearer ${userToken2}`)
                .send({
                    name: `Movie ${Math.floor(Math.random() * 99999) + 1}`,
                    description: 'Another great movie',
                    releaseYear: "2022",
                    genre: 'comedy',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            movie2 = response.body.data._id;
        });

        it('should return 401 Unauthorized for creating a movie without a token', async () => {
            const response = await request(app)
                .post('/api/v1/movies')
                .send({
                    name: 'UnauthorizedMovie',
                    description: 'Unauthorized movie creation test',
                    releaseYear: "2023",
                    genre: 'Drama',
                });

            expect(response.status).toBe(401);
        });
    });

    describe('GET /api/v1/movies', () => {
        it('should retrieve all movies ranked by rating', async () => {
            const response = await request(app)
                .get('/api/v1/movies')
                .query({ name: 'Movie' });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
        });
    });

    describe('GET /api/v1/movies/own', () => {
        it('should retrieve movies for the first user', async () => {
            const response = await request(app)
                .get('/api/v1/movies/own')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should retrieve movies for the second user', async () => {
            const response = await request(app)
                .get('/api/v1/movies/own')
                .set('Authorization', `Bearer ${userToken2}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
        });

        it('should return a message for a user without movies', async () => {
            // Assuming both users' movies are already deleted
            const response = await request(app)
                .get('/api/v1/movies/own')
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
        });
    });

    describe('DELETE /api/v1/movies/:id', () => {

        it('should return 401 Unauthorized for deleting a movie without a token', async () => {
            const movies = await request(app)
                .get('/api/v1/movies/own')
                .set('Authorization', `Bearer ${userToken}`);

            if (movies.body.data.length > 0) {
                const response = await request(app)
                    .delete(`/api/v1/movies/${movies.body.data[0]._id}`)
                expect(response.status).toBe(401);
            }
        });

        it('should delete the first user\'s movie', async () => {
            const movies = await request(app)
                .get('/api/v1/movies/own')
                .set('Authorization', `Bearer ${userToken}`);

            if (movies.body.data.length > 0) {
                const response = await request(app)
                    .delete(`/api/v1/movies/${movies.body.data[0]._id}`)
                    .set('Authorization', `Bearer ${userToken}`);

                expect(response.status).toBe(204);
            }
        });

        it('should delete the second user\'s movie', async () => {
            const movies = await request(app)
                .get('/api/v1/movies/own')
                .set('Authorization', `Bearer ${userToken2}`);

            if (movies.body.data.length > 0) {
                const response = await request(app)
                    .delete(`/api/v1/movies/${movies.body.data[0]._id}`)
                    .set('Authorization', `Bearer ${userToken2}`);

                expect(response.status).toBe(204);
            }
        });
    });
});
