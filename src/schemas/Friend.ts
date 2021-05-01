import { Column, Entity, ObjectType, PrimaryColumn } from 'typeorm';
import { User } from '../entities/User';

@Entity('friend')
class Friend {

  @PrimaryColumn()
  userName: string;

  @Column()
  friends: [
    {
      name: string;
    }
  ];
};

export { Friend };