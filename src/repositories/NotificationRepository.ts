import { EntityRepository, MongoRepository, Repository } from "typeorm";
import { Notifications } from '../schemas/Notifications'

@EntityRepository(Notifications)
class NotificationsRepository extends MongoRepository<Notifications> {

}

export { NotificationsRepository }