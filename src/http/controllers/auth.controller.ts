import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository';
import { AuthInvalidCredentialsError } from '@/services/_errors/auth-invalid-credentials.error';
import { AuthService } from '@/services/auth/auth.service';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

export const auth = async (request: FastifyRequest, reply: FastifyReply) => {
  const requestSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  });

  const { email, password } = requestSchema.parse(request.body);

  try {
    const prismaUsersRepository = new PrismaUsersRepository();
    const authService = new AuthService(prismaUsersRepository);

    await authService.execute({ email, password });
  } catch (error) {
    if (error instanceof AuthInvalidCredentialsError) {
      reply.status(401).send({ message: error.message });
    }

    throw error;
  }

  reply.status(200).send({ message: 'User authenticated successfully' });
};
