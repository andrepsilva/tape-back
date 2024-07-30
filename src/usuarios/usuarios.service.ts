// src/usuarios/usuarios.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from '@prisma/client';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    try {
      return await this.prisma.usuario.create({
        data: createUsuarioDto,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Erro ao criar usuário');
    }
  }

  async findAll(): Promise<Usuario[]> {
    try {
      return await this.prisma.usuario.findMany();
    } catch (error) {
      console.error('Error finding all users:', error);
      throw new InternalServerErrorException('Erro ao buscar usuários');
    }
  }

  async findOne(id: string): Promise<Usuario | null> {
    try {
      const usuario = await this.prisma.usuario.findUnique({
        where: { id },
      });

      if (!usuario) {
        throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
      }

      return usuario;
    } catch (error) {
      console.error(`Error finding user with ID ${id}:`, error);
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException('Erro ao buscar usuário');
    }
  }

  async remove(id: string): Promise<Usuario> {
    try {
      return await this.prisma.usuario.delete({
        where: { id },
      });
    } catch (error) {
      console.error(`Error removing user with ID ${id}:`, error);
      throw new InternalServerErrorException('Erro ao remover usuário');
    }
  }
}
