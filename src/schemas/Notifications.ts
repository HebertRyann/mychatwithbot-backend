import { Column, CreateDateColumn, Entity, ObjectID, ObjectIdColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity('notifications')
class Notifications {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  sender: string

  @Column()
  recipient: string

  @Column()
  message: string;

  @Column()
  groupName: string

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date
}

export { Notifications }