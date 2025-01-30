import { describe, it, expect } from 'vitest';
import { AuthService } from './auth.service';
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users.repository';
import { hash } from 'bcryptjs';
import { AuthInvalidCredentialsError } from '../_errors/auth-invalid-credentials.error';

describe('AuthenticateService', () => {
  it('should authenticate user with correct credentials', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthService(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: 'Jorginho Simpatia',
      email: 'jorginho.simpatia@gmail.com',
      password_hash: await hash('12345678', 6),
      date_of_birth: new Date('1990-01-01'),
    });

    const { user } = await sut.execute({
      email: 'jorginho.simpatia@gmail.com',
      password: '12345678',
    });

    expect(user.id).toBeDefined();
  });

  it('should not authenticate user with incorrect password', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthService(inMemoryUsersRepository);

    await inMemoryUsersRepository.create({
      name: 'Jorginho Simpatia',
      email: 'jorginho.simpatia@gmail.com',
      password_hash: await hash('12345678', 6),
      date_of_birth: new Date('1990-01-01'),
    });

    expect(async () => {
      await sut.execute({
        email: 'jorginho.simpatia@gmail.com',
        password: 'SenhaIncorreta',
      });
    }).rejects.toBeInstanceOf(AuthInvalidCredentialsError);
  });

  it('should not authenticate user with incorrect email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository();
    const sut = new AuthService(inMemoryUsersRepository);

    expect(async () => {
      await sut.execute({
        email: 'jorginho.simpatia@gmail.com',
        password: '12345678',
      });
    }).rejects.toBeInstanceOf(AuthInvalidCredentialsError);
  });
});
