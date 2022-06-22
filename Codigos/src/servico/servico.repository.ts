import { EntityRepository, Repository } from 'typeorm';
import { Servico } from './entities/servico.entity';

@EntityRepository(Servico)
export class ServicoRepository extends Repository<Servico> {}