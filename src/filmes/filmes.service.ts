import { Injectable, ConflictException, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { Prisma, Filme } from '@prisma/client';

@Injectable()
export class FilmesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFilmeDto: CreateFilmeDto): Promise<Filme> {
    try {
      const { generos, tmdb_id, nome, sinopse, classificacao, data_lancamento, poster_path, backdrop_path, popularidade, votos, media_votos } = createFilmeDto;

      // Verificar se o tmdb_id já existe
      const existingFilm = await this.prisma.filme.findUnique({
        where: { tmdb_id: tmdb_id },
      });

      if (existingFilm) {
        throw new ConflictException('tmdb_id já existe');
      }

      return await this.prisma.filme.create({
        data: {
          tmdb_id,
          nome,
          sinopse,
          classificacao,
          data_lancamento,
          poster_path,
          backdrop_path,
          popularidade,
          votos,
          media_votos,
          generos: {
            create: generos.map((id) => ({
              genero: {
                connect: { id },
              },
            })),
          },
        },
      });
    } catch (error) {
      console.error('Error creating filme:', error);
      if (error instanceof ConflictException) {
        throw error;
      }
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {  // Unique constraint failed
          throw new BadRequestException('Constraint violation');
        }
      }
      throw new InternalServerErrorException('Erro ao criar filme');
    }
  }

  async findAll(): Promise<Filme[]> {
    try {
      return await this.prisma.filme.findMany({
        include: { generos: true },
      });
    } catch (error) {
      console.error('Error finding all filmes:', error);
      throw new InternalServerErrorException('Erro ao buscar filmes');
    }
  }

  async findOne(id: string): Promise<Filme | null> {
    try {
      const filme = await this.prisma.filme.findUnique({
        where: { id },
        include: { generos: true },
      });

      if (!filme) {
        throw new NotFoundException(`Filme com ID ${id} não encontrado`);
      }

      return filme;
    } catch (error) {
      console.error(`Error finding filme with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar filme');
    }
  }

  async remove(id: string): Promise<Filme> {
    try {
      return await this.prisma.filme.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error removing filme with ID ${id}:`, error);
      throw new InternalServerErrorException('Erro ao remover filme');
    }
  }
}
