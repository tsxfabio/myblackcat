import { IUserRepository } from '@/types/users-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { AuthInvalidCredentialsError } from '../_errors/auth-invalid-credentials.error';

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
      throw new AuthInvalidCredentialsError();
    }

    const passwordMatch = await compare(password, user.password_hash);

    if (!passwordMatch) {
      throw new AuthInvalidCredentialsError();
    }

    return {
      user,
    };
  }
}
