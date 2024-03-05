import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context';
import toast from 'react-hot-toast';

// This hook will logout the user (remove token from local storage and reinitializa the context)
const useLogOut = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, updateUser } = useContext(UserContext);

    const logoutHandler = () => {
        localStorage.removeItem('COWLAR_TOKEN');
        updateUser(null);
        setIsLoggedIn(false)
        navigate('/login');
        toast("You're being logged out, Sayonara!", {
            icon: '👏', duration: 2000
        });
    };
    return { logoutHandler };
};
export default useLogOut;
