import { EntityRepository, Repository } from 'typeorm';
import { Filme } from './filme.entity';

@EntityRepository(Filme)
export class FilmeRepository extends Repository<Filme> {}
