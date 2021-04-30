import {
  Entity,
  PrimaryColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

@Entity('connection')
class Connection {

  @Column()
  socket_id: string;

  @PrimaryColumn()
  userName: string;

  @CreateDateColumn()
  created_at: string;
};

export { Connection };