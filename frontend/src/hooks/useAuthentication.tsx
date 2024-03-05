import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context';
import { verifyUser } from '../api/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// This hook will get the token for the local storage on first render i.e. page reload
// and get it verified by the backend and update the context

const useAuthVerification = (isRedirectionAllowed = false) => {
    const [pageLoading, setPageLoading] = useState(true);
    const { setIsLoggedIn, updateUser } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log('useAuthVerification.tsx');
        const verifyUser_ = async () => {
            const token = localStorage.getItem('COWLAR_TOKEN');
            console.log(token);
            if (token) {
                const user = await verifyUser(token);
                if (user) {
                    updateUser({ ...user, token: token });
                    setIsLoggedIn(true);
                }
                else {
                    localStorage.removeItem('COWLAR_TOKEN');
                    toast("Looks like your session is exired. Please log in again!", {
                        icon: '💤', duration: 4000
                    });
                    if (isRedirectionAllowed) navigate("/login");
                }
            }
            else {
                toast("Hi, you're in guest mode!", {
                    icon: '👏', duration: 2000
                });
                if (isRedirectionAllowed) navigate("/login");
            }

            setPageLoading(false);
        };
        verifyUser_();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { pageLoading };
};

export default useAuthVerification;
