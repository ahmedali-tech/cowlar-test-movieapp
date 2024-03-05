import request from 'supertest';
import app from '../app';

describe('Review APIs', () => {
    let userToken: string;
    let userId: string;
    let movieId: string;
    let reviewId: string;

    beforeAll(async () => {
        // Create the first user
        const response1 = await request(app)
            .post('/api/v1/auth/signup')
            .send({
                name: 'jestuserrr',
                email: `user${Math.floor(Math.random() * 9999) + 1}@example.com`,
                password: 'testuser1pass',
                phoneNumber: '923487204455',
            });

        userToken = response1.body.token;
        userId = response1.body.data.id;

        // Create a movie for testing
        const createMovieResponse = await request(app)
            .post('/api/v1/movies')
            .set('Authorization', `Bearer ${userToken}`)
            .send({
                name: `jesttest${Math.floor(Math.random() * 9999) + 1}`,
                description: 'A great movie for testing',
                releaseYear: "2023",
                genre: 'action',
            });

            console.log(createMovieResponse);
        movieId = createMovieResponse.body.data["_id"];
    });

    afterAll(async () => {
        // Delete the created review
        if (reviewId) {
            await request(app)
                .delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`);
        }

        // Delete the created movie
        await request(app)
            .delete(`/api/v1/movies/${movieId}`)
            .set('Authorization', `Bearer ${userToken}`);

        // Delete the first user
        await request(app)
            .delete(`/api/v1/user`)
            .set('Authorization', `Bearer ${userToken}`);
    });

    describe('POST /api/v1/movies/:movieId/reviews', () => {
        it('should create a new review for the movie', async () => {
            const response = await request(app)
                .post(`/api/v1/movies/${movieId}/reviews`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    ratingStars: 5,
                    comment: 'Excellent movie!',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            reviewId = response.body.data._id;
        });
    });

    describe('GET /api/v1/movies/:movieId/reviews', () => {
        it('should retrieve all reviews for the movie', async () => {
            const response = await request(app)
                .get(`/api/v1/movies/${movieId}/reviews`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data.otherReviews)).toBe(true);
            expect(response.body.data.ownReview[0]).toHaveProperty('ratingStars', 5);
            expect(response.body.data.ownReview[0]).toHaveProperty('comment', 'Excellent movie!');
        });
    });

    describe('PATCH /api/v1/movies/:movieId/reviews/reviewId', () => {
        it('should update the user\'s review for the movie', async () => {
            const response = await request(app)
                .patch(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`)
                .send({
                    ratingStars: 4,
                    comment: 'Very good movie!',
                });

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('ratingStars', 4);
            expect(response.body.data).toHaveProperty('comment', 'Very good movie!');
        });
        it('should return 401 Unauthorized for updating a review without a token', async () => {
            const response = await request(app)
                .patch(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .send({
                    ratingStars: 3,
                    comment: 'Good movie!',
                });

            expect(response.status).toBe(401);
        });
    });

    describe('DELETE /api/v1/movies/:movieId/reviews/reviewId', () => {

        it('should return 401 Unauthorized for deleting a review without a token', async () => {
            const response = await request(app)
                .delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`);

            expect(response.status).toBe(401);
        });

        it('should delete the user\'s review for the movie', async () => {
            const response = await request(app)
                .delete(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(204);
        });

        it('should return 404 for the deleted review', async () => {
            const response = await request(app)
                .get(`/api/v1/movies/${movieId}/reviews/${reviewId}`)
                .set('Authorization', `Bearer ${userToken}`);

            expect(response.status).toBe(404);
        });
    });
});
