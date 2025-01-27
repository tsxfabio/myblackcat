import { IUserRepository } from '@/types/users-repository';
import { Prisma, User } from '@prisma/client';

export class InMemoryUsersRepository implements IUserRepository {
  users: User[] = [];

  async findByEmail(email: string) {
    const user = await this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      date_of_birth: new Date(data.date_of_birth),
      createdAt: new Date(),
    };

    await this.users.push(user);

    return user;
  }
}
