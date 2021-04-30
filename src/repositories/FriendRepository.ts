import { EntityRepository, MongoRepository } from "typeorm";
import { Friend } from "../schemas/Friend";

@EntityRepository(Friend)
class FriendRepository extends MongoRepository<Friend> {
};

export { FriendRepository };