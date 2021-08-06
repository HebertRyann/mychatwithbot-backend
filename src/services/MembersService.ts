import { getCustomRepository, Repository } from "typeorm";
import { v4 } from "uuid";
import { Members } from "../entities/Members";
import { MembersRepository } from "../repositories/MembersRepository";


class MembersService {
  private membersRepository: Repository<Members>
  
  constructor() {
    this.membersRepository = getCustomRepository(MembersRepository)
  }

  async createMembers(room: string, member: string, admin?: boolean) {
    const members = this.membersRepository.create({
      id: v4(),
      room,
      userName: member,
      admin: admin || false,
    })

    await this.membersRepository.save(members)
  }

  async getMembers(room: string) {
    const members = await this.membersRepository.find({
      where: {
        room,
      }
    })

    return members
  }

  async getRooms(member: string) {
    const rooms = await this.membersRepository.find({
      where: {
        userName: member,
      }
    })

    return rooms
  }

}

export { MembersService };