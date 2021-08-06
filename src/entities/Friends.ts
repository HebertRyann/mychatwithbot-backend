import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, ObjectID, ObjectIdColumn, ObjectType, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../entities/User';

@Entity('friends')
class Friend {

  @PrimaryColumn()
  id: string

  @Column()
  userName: string;

  @Column()
  friendName: string;
  
  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
};

export { Friend };