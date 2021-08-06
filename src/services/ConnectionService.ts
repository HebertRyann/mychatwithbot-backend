import { getCustomRepository, Repository } from "typeorm";
import Connection from "../entities/Connection";
import { ConnectionRepository } from "../repositories/ConnectionRepository";

interface IConnectionCreate {

  socket_id: string;

  userName: string;
};

class ConnectionService {
  private connectionRepository:  Repository<Connection>

  constructor() {
    this.connectionRepository = getCustomRepository(ConnectionRepository)
  }

  async create({ socket_id, userName }: IConnectionCreate) {

    const connection = this.connectionRepository.create({
      socket_id,
      userName
    });

    await this.connectionRepository.save(connection);

    return connection;
    
  }

  async findByName(userName: string) {
    const findUser = await this.connectionRepository.findOne({
      where: {
        userName,
      }
    });

    return findUser
  }

};

export { ConnectionService };