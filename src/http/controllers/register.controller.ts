import { z } from 'zod';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UserRegisterService } from '../../services/users/user-register.service';
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';
import { UserAlreadyExistsError } from '@/services/errors/user-already-exists.error';

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const requestSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    date_of_birth: z
      .string()
      .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
        message: 'Invalid date format. Use YYYY-MM-DD',
      })
      .transform((value) => new Date(value)),
  });

  const { name, email, password, date_of_birth } = requestSchema.parse(
    request.body,
  );

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const registerService = new UserRegisterService(prismaUsersRepository);

    await registerService.execute({
      name,
      email,
      password,
      date_of_birth,
    });
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      reply.status(409).send({ message: error.message });
    }

    throw error;
  }

  reply.status(201).send({ message: 'User created successfully' });
};
