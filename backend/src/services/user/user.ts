import UserModel from "../../models/user";

const deleteUser = async (userId: string) => {
    const movie = await UserModel.findByIdAndDelete(userId);
    return movie;
}

export { deleteUser }
