import {
  Request,
  Response
} from 'express';
import { v4 } from 'uuid';
import { FriendService } from '../services/FriendService';
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
  async loadAllUsers(request: Request, response: Response) {
    const userService = new UserService();
    const { userName } = request.params;

    try {
      const allUsers = await userService.loadAllUsers(userName)
      return response.json(allUsers);
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }
  }
}

export { UserControllers };