import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('members')
class Members {

  @PrimaryColumn()
  id: string;
  
  @Column()
  userName: string;
  
  @Column()
  room: string;

  @Column()
  admin: boolean;
};

export { Members };