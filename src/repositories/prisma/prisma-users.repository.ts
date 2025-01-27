import { prisma } from '@/lib/prisma';
import { IUserRepository } from '@/types/users-repository';
import { Prisma } from '@prisma/client';

export class PrismaUsersRepository implements IUserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
