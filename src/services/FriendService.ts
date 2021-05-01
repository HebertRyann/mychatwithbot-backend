import { getMongoRepository, MongoRepository } from "typeorm";
import { Friend } from "../schemas/Friend";

class FriendService {
  private friendRepository: MongoRepository<Friend>

  constructor() {
    this.friendRepository = getMongoRepository(Friend, 'mongo');
  }

  async sendRequest(userName: string, friendUsername: string) {
    // const findUser = await this.friendRepository.findOne({
    //   where: {
    //     ,
    //   }
    // });

    // if(!findUser) {
    //   throw new Error('User not found');
    // };

    const friend = this.friendRepository.create({
      userName,
      friends: [
        {
          name: friendUsername,
        }
      ]
    });

    await this.friendRepository.save(friend);

    return friend;
  };

};

export { FriendService };