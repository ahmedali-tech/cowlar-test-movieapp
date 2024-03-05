import toast from "react-hot-toast";
import axios from "../../config/axios";


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
        toast.error(error?.response?.data?.message || 'oops, seem like server is down! Try again later');
    }
    return null;
};