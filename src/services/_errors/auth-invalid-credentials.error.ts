export class AuthInvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}
