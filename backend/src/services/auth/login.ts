import UserModel from "../../models/user";

const loginService = async (email: string, password: string) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (user && (await user.matchPassword(password, user?.password))) {
        console.log('Password is correct');
        const { _id, email, name } = user
        return { id: _id, email, name };
    }

    return null;
}

export default loginService