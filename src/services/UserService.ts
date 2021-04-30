import { getCustomRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

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
}

export { UserService };