import React from 'react'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
    return (
        <>
            <nav className="bg-black sticky w-full z-20 top-0 start-0 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                        {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" /> */}
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-primaryGreen">MovieMania</span>
                    </a>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button type="button" className="text-white bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2 text-center">Log In</button>

                    </div>

                </div>
            </nav>
        </>

    )
}

export default Navbar