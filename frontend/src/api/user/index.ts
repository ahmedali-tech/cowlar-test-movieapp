import toast from "react-hot-toast";
import axios from "../../config/axios";

export const loginUser = async (email: string, password: string) => {
    try {
        const res = await axios.post('/auth/login', {
            email,
            password,
        });
        if (res.status === 200 || res.data.message === "success") {
            toast.success('Successfully logged in, redirecting you!', { duration: 1500, className: 'text-center' });
            return {
                user: res.data.data,
                token: res.data.token,
            };
        }
    } catch (error: any) {
        console.log('Login error', error);
        toast.error(error?.response?.data?.message || 'Login failed');
    }
    return null;
};

export const signUpUser = async (email: string, password: string, name: string, phoneNumber: string) => {
    try {
        const res = await axios.post('/auth/signup', {
            email,
            password,
            name,
            phoneNumber
        });
        if (res.status === 200 || res.data.message === "success") {
            toast.success('Successfully registered, Welcome!', { duration: 1500, className: 'text-center' });
            return {
                user: res.data.data,
                token: res.data.token,
            };
        }
    } catch (error: any) {
        console.log('SignUp error', error);
        toast.error(error?.response?.data?.message || 'Sign up failed, try again!');
    }
    return null;
};


export const verifyUser = async (token: string) => {
    try {
        const response = await axios.get('/auth/verify-user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === 200) {
            return response.data.data;
        } else {
            throw new Error('Token verification failed');
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};