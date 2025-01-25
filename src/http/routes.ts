import { FastifyInstance } from 'fastify'
import { register } from './controllers/register.controller'

export const appRoutes = (app: FastifyInstance) => {
  app.post('/user', register)
}
