import UserModel from "../../models/user";

const loginService = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (user && (await user.matchPassword(password, user?.password))) {
        console.log('Password is correct');
        return user.id;
    }

    return null;
}

export default loginService