import { EntityRepository, Repository } from 'typeorm';
import { Genero } from './genero.entity';

@EntityRepository(Genero)
export class GeneroRepository extends Repository<Genero> {}
