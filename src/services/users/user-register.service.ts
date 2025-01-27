import { ICreateUser } from '@/types/users';
import { IUserRepository } from '@/types/users-repository';
import { hash } from 'bcryptjs';
import { UserAlreadyExistsError } from '../errors/user-already-exists.error';
import { User } from '@prisma/client';

// SOLID
// D - Dependency Inversion Principle

interface IRegisterUserResponse {
  user: User;
}

export class UserRegisterService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({
    name,
    email,
    password,
    date_of_birth,
  }: ICreateUser): Promise<IRegisterUserResponse> {
    const password_hash = await hash(password, 6);

    // Regra de Negócio: Usuário não pode se cadastrar com o mesmo e-mail
    const userWithSameEmail = await this.usersRepository.findByEmail(email);

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      date_of_birth,
    });

    return {
      user,
    };
  }
}
