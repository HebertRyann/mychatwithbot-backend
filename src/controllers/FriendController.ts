import {
  Request,
  Response
} from 'express';
import { FriendService } from '../services/FriendService';

class FriendControllers {
  async create(request: Request, response: Response) {
    const { userName, friendUserName } = request.body;
    console.log(userName, friendUserName);

    const friendService = new FriendService();

    try {
      const user = await friendService.sendRequest(userName, friendUserName)
      return response.json(user);
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }

  }
}

export { FriendControllers };