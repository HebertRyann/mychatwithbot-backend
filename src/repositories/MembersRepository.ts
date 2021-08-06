import {
  EntityRepository,
  Repository,
} from 'typeorm';
import { Members } from '../entities/Members';

@EntityRepository(Members)
class MembersRepository extends Repository<Members> {

}

export { MembersRepository };