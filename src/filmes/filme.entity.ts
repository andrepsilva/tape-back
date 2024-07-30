import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Genero } from '../generos/genero.entity';

@Entity()
export class Filme {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tmdb_id: number;

  @Column()
  nome: string;

  @Column('text')
  sinopse: string;

  @Column()
  classificacao: string;

  @Column('date')
  data_lancamento: Date;

  @Column()
  poster_path: string;

  @Column()
  backdrop_path: string;

  @Column('float')
  popularidade: number;

  @Column('int')
  votos: number;

  @Column('float')
  media_votos: number;

  @ManyToMany(() => Genero, genero => genero.filmes, { cascade: true })
  @JoinTable()
  generos: Genero[];
}
