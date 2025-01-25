import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { RegisterService } from '../../services/register.service'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

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
  })

  const { name, email, password, date_of_birth } = requestSchema.parse(
    request.body,
  )

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerService  = new RegisterService(
      prismaUsersRepository
    )

    await registerService.execute({
      name,
      email,
      password,
      date_of_birth,
    })
  } catch (error: any) {
    reply.status(409).send({ message: error.message })
  }

  reply.status(201).send({ message: 'User created successfully' })
}
