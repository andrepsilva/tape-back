import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGeneroDto } from './dto/create-genero.dto';
import { Genero } from '@prisma/client';

@Injectable()
export class GenerosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGeneroDto: CreateGeneroDto): Promise<Genero> {
    try {
      return await this.prisma.genero.create({
        data: createGeneroDto,
      });
    } catch (error) {
      console.error('Error creating genero:', error);
      throw new InternalServerErrorException('Erro ao criar gênero');
    }
  }

  async findAll(): Promise<Genero[]> {
    try {
      return await this.prisma.genero.findMany();
    } catch (error) {
      console.error('Error finding all generos:', error);
      throw new InternalServerErrorException('Erro ao buscar gêneros');
    }
  }

  async findOne(id: string): Promise<Genero | null> {
    try {
      const genero = await this.prisma.genero.findUnique({
        where: { id },
      });
      if (!genero) {
        throw new NotFoundException(`Gênero com ID ${id} não encontrado`);
      }
      return genero;
    } catch (error) {
      console.error(`Error finding genero with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar gênero');
    }
  }

  async remove(id: string): Promise<Genero> {
    try {
      const genero = await this.prisma.genero.delete({
        where: { id },
      });
      return genero;
    } catch (error) {
      console.error(`Error removing genero with ID ${id}:`, error);
      throw new InternalServerErrorException('Erro ao remover gênero');
    }
  }
}
