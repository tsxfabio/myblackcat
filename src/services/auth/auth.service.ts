import { IUserRepository } from '@/types/users-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

interface IAuthServiceRequest {
  email: string;
  password: string;
}

interface IAuthServiceResponse {
  user: User;
}

export class AuthService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    email,
    password,
  }: IAuthServiceRequest): Promise<IAuthServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    return {
      user,
    };
  }
}
