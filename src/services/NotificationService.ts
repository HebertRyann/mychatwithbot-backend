import { getCustomRepository, getMongoRepository, MongoRepository } from "typeorm";
import { NotificationsRepository } from "../repositories/NotificationRepository"
import { Notifications } from "../schemas/Notifications";

interface CreateNotificationData {
  userName: string;
  friendUserName: string;
  message?: string;
  groupName?: string;
}

class NotificationService {
  private notificationRepository: MongoRepository<Notifications>;

  constructor() {
    this.notificationRepository = getMongoRepository(Notifications, 'mongo');
  }

  async create({ friendUserName, userName, groupName, message }: CreateNotificationData) {
    const notification = this.notificationRepository.create({
      groupName,
      message,
      recipient: friendUserName,
      sender: userName,
    });
    
    await this.notificationRepository.save(notification)

    return notification;
  }

  async loadNotifications(userName: string) {
    const notifications = await this.notificationRepository.find({
      where: {
        recipient: userName
      }
    })
    
    return notifications;
  }
  async removeNotifications(id: string) {
    await this.notificationRepository.delete(id)
  }

}

export { NotificationService }