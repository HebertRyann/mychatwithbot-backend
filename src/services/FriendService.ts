import { getCustomRepository, Repository } from "typeorm";
import { v4 } from "uuid";
import { Friend } from '../entities/Friends';
import { User } from "../entities/User";
import { FriendRepository } from "../repositories/FriendRepository";
import { UserRepository } from "../repositories/UserRepository";

interface SendRequest {
  userName: string;
  friendUserName: string;
}

class FriendService {
  private friendRepository: Repository<Friend>
  private userRepository: Repository<User>

  constructor() {
    this.friendRepository = getCustomRepository(FriendRepository);
    this.userRepository = getCustomRepository(UserRepository);
  }

  async sendRequest({ friendUserName, userName }: SendRequest) {
    const findUser = await this.userRepository.findOne({
      where: {
        userName: friendUserName,
      }
    });
    const allFriends = await this.friendRepository.find();
    const findFriend = allFriends.find(user => 
      user.userName === userName && user.friendName === friendUserName || 
      user.friendName === userName && user.userName === friendUserName)

    if(findUser) {
      if(!findFriend) {
        if(friendUserName !== userName){
          const friend = this.friendRepository.create({
            id: v4(),
            userName,
            friendName: friendUserName,
            status: 'pending',
          });
          await this.friendRepository.save(friend)

          return friend
        } else {
          throw new Error('It is not possible create friendship with youself')
        }
      } else {
        throw new Error('Yours are fireds')
      }
    } else {
      throw new Error('User not exist')
    }
  };

  async acceptFriend(id: string) {
    const findRequest = await this.friendRepository.findOne({
      where: {
        id,
      }
    })

    if(findRequest) {
      findRequest.status = 'active'
      await this.friendRepository.save(findRequest)
    } else {
      throw new Error('Request not exist')
    }

    return findRequest
  };

  async listFriendByUser(userName: string) {
    const findFriends = await this.friendRepository.find({
      where: {       
        status: 'active'
      }
    })

    if(findFriends) {
      const filterUser = findFriends.filter(user => 
        user.userName === userName || 
        user.friendName === userName)
      const friends = filterUser.map(user => 
        user.friendName === userName ? 
        { ...user, userName: userName, friendName: user.userName} : 
        user)
      return friends
    }
  };

  async listPendingFriendByUser(userName: string) {
    const findAllPending = await this.friendRepository.find({
      where: {
        friendName: userName,
        status: 'pending'
      }
    })

    if(findAllPending) {
      return findAllPending
    }

  };

  async undoFriendship(id: string) {
    const findFriendship = await this.friendRepository.findOne({
      where: {
        id,
      }
    })

    if(findFriendship) {
      await this.friendRepository.remove(findFriendship)
      return findFriendship
    } else {
      throw new Error('Friendship not exist')
    }


  };


};

export { FriendService };