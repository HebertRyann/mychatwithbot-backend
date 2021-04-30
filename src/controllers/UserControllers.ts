import {
  Request,
  Response
} from 'express';
import { v4 } from 'uuid';
import { UserService } from '../services/UserService';

class UserControllers {
  async create(request: Request, response: Response) {
    const { userName } = request.body;

    const userService = new UserService();

    try {
      const user = await userService.create({
        userName
      })
      return response.json(user);
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }

  }
}

export { UserControllers };