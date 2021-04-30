import { getMongoRepository, MongoRepository } from "typeorm";
import { Friend } from "../schemas/Friend";

class FriendService {
  private friendRepository: MongoRepository<Friend>

  constructor() {
    this.friendRepository = getMongoRepository(Friend, 'mongo');
  }

  async create() {

  };

};

export { FriendService };