import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreatedUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createdUser = container.resolve(CreatedUserService);

        const user = await createdUser.execute({
            name,
            email,
            password,
        });

        delete user.password;

        return response.json(user);
    }
}
