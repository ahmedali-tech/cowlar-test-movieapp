import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { verifyToken } from '../utils/api';
import { UserContext } from '../context';
import { verifyUser } from '../api/user';
import toast from 'react-hot-toast';

// This hook will get the token for the local storage on first render i.e. page reload
// and get it verified by the backend and update the context

const useAuthVerification = () => {
    const navigate = useNavigate();
    const [pageLoading, setPageLoading] = useState(true);
    const { setIsLoggedIn, updateUser } = useContext(UserContext);

    useEffect(() => {
        console.log('useAuthVerification.tsx');
        const verifyUser_ = async () => {
            const token = localStorage.getItem('COWLAR_TOKEN');
            console.log(token);
            if (token) {
                const user = await verifyUser(token);
                if (user) {
                    updateUser({...user, token: token});
                    setIsLoggedIn(true);
                }
                else {
                    localStorage.removeItem('COWLAR_TOKEN');
                    toast("Looks like your session is exired. Please log in again!", {
                        icon: '💤', duration: 4000
                    });
                }
            }
            else {
                toast("Hi, you're in guest mode. Log In!", {
                    icon: '👏', duration: 2000
                });
                console.log("here");
            }
            console.log("here2");

            setPageLoading(false);
        };
        verifyUser_();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // const logoutHandler = () => {
    //     localStorage.removeItem('COWLAR_TOKEN');
    //     navigate('/login');
    // };

    return { pageLoading };
};

export default useAuthVerification;
