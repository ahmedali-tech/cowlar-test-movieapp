import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context';
import useLogOut from '../../hooks/useLogOut';

function Navbar() {
    const { isLoggedIn, user } = useContext(UserContext);
    const { logoutHandler } = useLogOut();

    return (
        <>
            <nav className="bg-black sticky w-full z-20 top-0 start-0 ">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-primaryGreen">MovieMania</span>
                    </Link>
                    {
                        isLoggedIn ? (
                            <>
                                <div className="flex items-center gap-5 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                    <p className='font-medium text-white'>Hello, {user?.name || "user"}</p>
                                    <button onClick={() => logoutHandler()} type="button" className="text-white bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2 text-center">Log out</button>
                                </div>
                            </>
                        ) : (
                            <Link to="/login">
                                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                                    <button type="button" className="text-white bg-primaryGreen hover:bg-secondaryGreen font-medium rounded-lg text-sm px-4 py-2 text-center">Log In</button>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar