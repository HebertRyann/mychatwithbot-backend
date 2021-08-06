import { EntityRepository, MongoRepository, Repository } from "typeorm";
import { Friend } from '../entities/Friends';

@EntityRepository(Friend)
class FriendRepository extends Repository<Friend> {
};

export { FriendRepository };