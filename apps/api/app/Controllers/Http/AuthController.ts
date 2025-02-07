import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { rules, schema } from '@ioc:Adonis/Core/Validator'

/*
|--------------------------------------------------------------------------
| AuthController
|--------------------------------------------------------------------------
|
| This file is in charge of handling authentication requests.
|
*/
export default class AuthController {
  /*
  |--------------------------------------------------------------------------
  | Register
  |--------------------------------------------------------------------------
  |
  | This method is in charge of handling registration requests.
  |
  */
  public async register({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate({
      schema: this.authSchema({ passwordConfirmation: true }),
    })

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.forbidden({ errors: [{ message: 'User already exists with this email' }] })
    }

    const user = await User.create({ email, password })
    const { token } = await auth.use('api').generate(user)
    return response.created({ user, token })
  }

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  |
  | This method is in charge of handling login requests.
  |
  */
  public async login({ auth, request, response }: HttpContextContract) {
    const { email, password } = await request.validate({
      schema: this.authSchema(),
    })

    try {
      const { token } = await auth.use('api').attempt(email, password)
      const user = await User.findBy('email', email)!
      return { user, token }
    } catch {
      return response.unauthorized({ errors: [{ message: 'Invalid credentials' }] })
    }
  }

  private authSchema({ passwordConfirmation = false }: { passwordConfirmation?: boolean } = {}) {
    return schema.create({
      email: schema.string([rules.trim(), rules.email()]),
      password: schema.string([
        rules.trim(),
        rules.minLength(8),
        rules.containsNumber(),
        rules.containsLowercaseCharacter(),
        rules.containsUppercaseCharacter(),
        rules.containsSpecialCharacter(),
        ...(passwordConfirmation ? [rules.confirmed('passwordConfirmation')] : []),
      ]),
    })
  }
}
