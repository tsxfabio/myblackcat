import { prisma } from "@/lib/prisma";
import { ICreateUser } from "@/types/users";
import { hash } from "bcryptjs";

// SOLID
// D - Dependency Inversion Principle

export class RegisterService {
  constructor(private usersRepository: any) { }

  async execute({ name, email, password, date_of_birth }: ICreateUser) {
    const password_hash = await hash(password, 6)

    if (userWithSameEmail) {
      throw new Error('User with same email already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
      date_of_birth
    })
  }

}

