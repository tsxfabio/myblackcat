import { FastifyInstance } from 'fastify';
import { register } from './controllers/register.controller';
import { auth } from './controllers/auth.controller';

export const appRoutes = (app: FastifyInstance) => {
  app.post('/user', register);
  app.post('/login', auth);
};
