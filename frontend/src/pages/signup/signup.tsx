import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import BasicButton from '../../components/button/basic-button';
import { signUpUser } from '../../api/user';
import toast, { Toaster } from 'react-hot-toast';
import { UserContext } from '../../context';
import useAuthVerification from '../../hooks/useAuthentication';
import React from 'react';
import RootLayout from '../../Layout/RootLayout';
import Loading from '../../components/loading';

function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [submitLoading, setSubmitLoading] = useState<boolean>(false);

    const { isLoggedIn, setIsLoggedIn, updateUser } = useContext(UserContext);

    const { pageLoading } = useAuthVerification();

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        setSubmitLoading(true);
        try {
            const user = await signUpUser(data.email, data.password, data.fullName, data.phoneNumber);
            console.log(user);
            if (user) {
                updateUser({ ...user.user, token: user.token });
                localStorage.setItem('COWLAR_TOKEN', user.token);
                setIsLoggedIn(true);
                setTimeout(() => { //delay for the toast to be readable
                    navigate('/');
                }, 750);
            }
        } catch (error) {
            setSubmitLoading(false);
            console.log('error', error);
        }
        setSubmitLoading(false);
    };

    React.useEffect(() => {
        if (isLoggedIn) {
            toast('You are already logged in! Log out first!', { icon: "🧐" })
            navigate('/');
        }
    }, [isLoggedIn])

    if (pageLoading) {
        return (
            <>
                <Toaster />
                <RootLayout>
                    <div className="w-screen h-screen flex items-center justify-center">
                        <Loading />
                        <p className="mx-2">Loading ...</p>
                    </div>
                </RootLayout>
            </>
        );
    }

    return (
        <>
            <Toaster />
            <RootLayout>
                <div className="custom-bg-gradient flex min-h-screen items-center justify-center px-4" style={{ backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%),url(/images/theatre-551797_1280.jpg)" }}>
                    <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                            <h1 data-testid="signup-heading" className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                Sign up
                            </h1>
                            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                                <div>
                                    <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-gray-900">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm ${errors.fullName ? 'border-red-500' : ''}`}
                                        placeholder="John Doe"
                                        {...register('fullName', { required: 'Full Name is required' })}
                                    />
                                    {errors.fullName && <span className="text-sm text-red-500">{errors.fullName.message?.toString()}</span>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-900">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm ${errors.email ? 'border-red-500' : ''}`}
                                        placeholder="name@service.com"
                                        {...register('email', {
                                            required: 'Email is required',
                                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                                        })
                                        }
                                    />
                                    {errors.email && <span className="text-sm text-red-500">{errors.email.message?.toString()}</span>}
                                </div>

                                <div>
                                    <label htmlFor="phoneNumber" className="mb-2 block text-sm font-medium text-gray-900">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phoneNumber"
                                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm ${errors.phoneNumber ? 'border-red-500' : ''}`}
                                        placeholder="923121231234"
                                        inputMode="numeric"
                                        {...register('phoneNumber', { required: 'Phone Number is required', pattern: { value: /^\92\d{10}$/, message: 'Please enter only numeric values of the format: 923487201234' } })}
                                    />
                                    {errors.phoneNumber && <span className="text-sm text-red-500">{errors.phoneNumber.message?.toString()}</span>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="mb-2 block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="••••••••"
                                        className={`block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm ${errors.password ? 'border-red-500' : ''}`}
                                        {...register('password', { required: 'Password is required', minLength: { value: 8, message: 'Password is too short' } })}
                                    />
                                    {errors.password && <span className="text-sm text-red-500">{errors.password.message?.toString()}</span>}
                                </div>

                                <div className="text-sm text-red-500">{/* Add general form error message here */}</div>

                                <div className="flex items-center justify-center">
                                    <BasicButton
                                        isLoading={submitLoading}
                                        text="Sign up"
                                        loadingText="Signing up ..."
                                        type='submit'
                                    />
                                </div>

                                <p className="text-sm font-light text-gray-500 ">
                                    Already have an account?{' '}
                                    <Link to="/login" className="font-medium text-primaryGreen hover:underline opacity-[0.9]">
                                        Log in
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </RootLayout>
        </>
    );
}

export default SignUp;