import toast from "react-hot-toast";
import axios from "../../config/axios";

interface IReview {
    comment: string;
    ratingStars: number
}

export const getReviews = async (movieId: string, token: string) => {
    try {

        const headers = !!token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`/movies/${movieId}/reviews`, { headers });

        if (res.status === 200 || res.data.message === "success") {
            return {
                ownReview: res.data.data.ownReview,
                allReviews: res.data.data.otherReviews
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        toast.error('oops, seem like server is down! Couldnt fetch reviews! Try again later');
    }
    return null;
};

export const createReviews = async (movieId: string, token: string, review: IReview) => {
    try {
        const res = await axios.post(`/movies/${movieId}/reviews`, {
            comment: review.comment,
            ratingStars: review.ratingStars
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 200 || res.data.message === "success") {
            return {
                data: res.data.data
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        toast.error('oops, seem like server is down! Couldnt fetch reviews! Try again later');
    }
    return null;
};

export const editReview = async (movieId: string, token: string, reviewId: string, review: IReview) => {
    try {
        const res = await axios.patch(`/movies/${movieId}/reviews/${reviewId}`, {
            comment: review.comment,
            ratingStars: review.ratingStars
        }, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 200 || res.data.message === "success") {
            return {
                data: res.data.data
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        toast.error('oops, seem like server is down! Couldnt fetch reviews! Try again later');
    }
    return null;
};

export const deleteReviews = async (movieId: string, reviewId: string, token: string) => {
    try {
        const res = await axios.delete(`/movies/${movieId}/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } });

        if (res.status === 204) {
            return {
                deleted: true
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        toast.error('oops, seem like server is down! Couldnt fetch reviews! Try again later');
    }
    return null;
};
