import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Filme } from '../filmes/filme.entity';

@Entity()
export class Genero {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @ManyToMany(() => Filme, filme => filme.generos)
  filmes: Filme[];
}
