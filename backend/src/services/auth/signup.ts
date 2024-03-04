import UserModel from "../../models/user";

const signUpService = async (name: string, password: string, email: string, phoneNumber: string) => {
    
    const newUser = await UserModel.create({
        name, password, phoneNumber, email
    });
    console.log(newUser);
    return newUser;
}

export default signUpService