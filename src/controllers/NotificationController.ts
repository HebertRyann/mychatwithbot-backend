import {
  Request,
  Response
} from 'express';
import { FriendService } from '../services/FriendService';
import { MembersService } from '../services/MembersService';
import { NotificationService } from '../services/NotificationService';

class NotificationControllers {

  async create(request: Request, response: Response) {
    const { userName, friendUserName } = request.body;

    const friendService = new FriendService();

    try {
      const friend = await friendService.sendRequest({
        userName, 
        friendUserName
      })
      return response.json(friend);
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }

  }
  
  async findFriendsByUser(request: Request, response: Response) {
    const { userName } = request.params;

    const friendService = new FriendService();
    const memberService = new MembersService();

    try {
      const friend = await friendService.listFriendByUser(userName)
      const rooms = await memberService.getRooms(userName)
      return response.json({
        friend,
        rooms
      });
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }
  }

  async findAllPendingByUser(request: Request, response: Response) {
    const { userName } = request.params;

    const friendService = new FriendService();
    const notificationService = new NotificationService();

    try {
      const friend = await friendService.listPendingFriendByUser(userName)

    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }
  }

  async acceptRequest(request: Request, response: Response) {
    const { id } = request.params;

    const friendService = new FriendService();

    try {
      const friend = await friendService.acceptFriend(id)
      return response.json(friend);
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }
  }

  async undoFriendship(request: Request, response: Response) {
    const { id } = request.params;

    const friendService = new FriendService();

    try {
      await friendService.undoFriendship(id)
      return response.json({
        message: 'Solicitation deleted with success'
      });
    } catch (error) {
      response.status(400).json({
        message: error.message
      });
    }
  }
}

export { NotificationControllers };