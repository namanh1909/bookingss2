import bcrypt from 'bcryptjs';

import { User, UserType } from '@/api/user/userModel';

export const userRepository = {
  findAllAsync: async (): Promise<UserType[]> => {
    return User.find();
  },

  findByIdAsync: async (IdUser: string): Promise<UserType | null> => {
    return User.findOne({ IdUser });
  },

  findByEmailAsync: async (email: string): Promise<UserType | null> => {
    return User.findOne({ email });
  },

  createUserAsync: async (userData: any): Promise<any> => {
    const newUser = new User(userData);
    return newUser.save();
  },

  updateUserAsync: async (id: string, userData: IUser): Promise<UserType | null> => {
    return User.findByIdAndUpdate(id, userData, { new: true });
  },

  changePasswordAsync: async (id: string, newPassword: string): Promise<UserType | null> => {
    const hashPassword = await bcrypt.hash(newPassword, 10);
    return User.findByIdAndUpdate(id, { password: hashPassword }, { new: true });
  },
};
