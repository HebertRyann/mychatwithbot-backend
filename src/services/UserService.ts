import { getCustomRepository, Repository } from "typeorm";
import { Friend } from "../entities/Friends";
import { User } from "../entities/User";
import { FriendRepository } from "../repositories/FriendRepository";
import { UserRepository } from "../repositories/UserRepository";
import { FriendService } from "./FriendService";

interface IUserCreate {

  userName: string;
}

class UserService {
  private userRepository: Repository<User>;
  
  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create({ userName }: IUserCreate) {
    const name = userName.toLowerCase();

    const findUser = await this.userRepository.findOne(name);
    
    if(findUser) {
      return findUser;
    }
    
    const user = this.userRepository.create({ userName: name });
    
    if(!user) {
      throw new Error('User not Created try again');
    }

    await this.userRepository.save(user);

    return user
  };
  

  async loadAllUsers(userName: string) {
    const friendService = new FriendService();
    const allUsers = (await this.userRepository.find()).filter(user => user.userName !== userName);
    return allUsers;
    
  };
}

export { UserService };