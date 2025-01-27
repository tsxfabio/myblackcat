import { describe, expect, it } from 'vitest';
import { UserRegisterService } from './user-register.service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';

describe('UserRegisterService', () => {
  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const registerUser = new UserRegisterService(inMemoryUsersRepository);

    const { user } = await registerUser.execute({
      name: 'Jorginho Simpatia',
      email: 'jorginho_simpatia@gmail.com',
      password: 'Jorginho@123',
      date_of_birth: new Date('1990-01-01'),
    });

    const isPasswordCorrectlyHashed = await compare(
      'Jorginho@123',
      user.password_hash,
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });
});
