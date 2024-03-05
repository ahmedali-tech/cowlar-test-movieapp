import axios from "../../config/axios";
import IMovie from "../../interfaces/movie";

export const getAllMovies = async (searchFilter: string) => {
    try {
        const res = await axios.get(`/movies?name=${searchFilter}`);
        if (res.status === 200 || res.data.message === "success") {
            // toast.success('Successfully logged in, redirecting you!', { duration: 1500, className: 'text-center' });
            return {
                data: res.data.data,
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        // toast.error(error?.response?.data?.message || 'oops, seem like server is down! Try again later');
    }
    return null;
};

export const getOwnMovies = async (token: string) => {
    try {
        const res = await axios.get(`/movies/own`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        if (res.status === 200 || res.data.message === "success") {
            // toast.success('Successfully logged in, redirecting you!', { duration: 1500, className: 'text-center' });
            return {
                data: res.data.data,
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        // toast.error(error?.response?.data?.message || 'oops, seem like server is down! Try again later');
    }
    return null;
};

export const getMovie = async (id: string = "") => {
    try {
        const res = await axios.get(`/movies/${id}`);
        if (res.status === 200 || res.data.message === "success") {
            // toast.success('Successfully logged in, redirecting you!', { duration: 1500, className: 'text-center' });
            return {
                data: res.data.data,
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
        // toast.error(error?.response?.data?.message || 'oops, seem like server is down! Try again later');
    }
    return null;
};

export const createMovies = async (movie: IMovie, token: string) => {
    try {
        const res = await axios.post("/movies", { ...movie }, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.status === 200 || res.data.message === "success") {
            return {
                data: res.data.data,
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
    }
    return null;
};

export const deleteMovies = async (movieId: string, token: string) => {
    try {
        const res = await axios.delete(`/movies/${movieId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        if (res.status === 204) {
            return {
                deleted: true
            };
        }
    } catch (error: any) {
        console.log('Movies fetching error', error);
    }
    return null;
};