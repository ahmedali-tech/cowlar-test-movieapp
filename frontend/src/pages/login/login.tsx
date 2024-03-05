import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../../components/loading'
import BasicButton from '../../components/button/basic-button'
import { useForm } from 'react-hook-form';

function LogIn() {

    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);

    }

    return (
        <>
            <div className="custom-bg-gradient flex min-h-screen items-center justify-center px-4"
                style={{ backgroundImage: "linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%),url(/images/theatre-551797_1280.jpg)" }}>
                <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
                    <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                            Log in
                        </h1>
                        <form
                            className="space-y-4 md:space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium text-gray-900 "
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"

                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                    placeholder="name@service.com"
                                    {...register('email', { required: 'Email is required' })}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm font-medium text-gray-900 "
                                >
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 sm:text-sm"
                                    {...register('password', { required: 'Password is required' })}
                                />
                            </div>

                            <div className="text-sm text-red-500"></div>

                            <div className="flex items-center justify-center">
                                <BasicButton
                                    isLoading={false}
                                    text="Log in"
                                    loadingText="Loggin in ..."
                                    type='submit'
                                />
                            </div>

                            <p className="text-sm font-light text-gray-500 ">
                                Don't have an account?{' '}
                                <Link
                                    to="/signup"
                                    className="font-medium text-primaryGreen hover:underline opacity-[0.9]"
                                >
                                    Sign Up
                                </Link>

                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LogIn