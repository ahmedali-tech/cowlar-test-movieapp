import { IUser } from '.';

export interface IContext {
    user: IUser | null;
    updateUser: (userData: IUser) => void;
}
