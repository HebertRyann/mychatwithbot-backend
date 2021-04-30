import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('friend')
class Friend {

  @PrimaryColumn()
  userName: string;

  @Column()
  friends: string
};

export { Friend };