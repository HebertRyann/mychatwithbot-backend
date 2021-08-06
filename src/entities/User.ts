import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
} from 'typeorm';

@Entity('user')
class User {

  @PrimaryColumn()
  userName: string;

  @CreateDateColumn()
  created_at: string;
}

export { User };