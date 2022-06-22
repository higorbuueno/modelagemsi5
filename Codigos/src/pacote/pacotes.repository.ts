import { EntityRepository, Repository } from 'typeorm';
import { Pacote } from './entities/pacote.entity';

@EntityRepository(Pacote)
export class PacoteRepository extends Repository<Pacote> {}