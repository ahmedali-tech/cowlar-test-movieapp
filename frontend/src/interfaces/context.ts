import { IUser } from '.';

export interface IContext {
    user: IUser | null;
    updateUser: (userData: IUser | null) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (val: boolean) => void;

}
