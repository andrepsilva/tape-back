// src/clientes/clientes.service.ts
import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { Cliente } from '@prisma/client';

@Injectable()
export class ClientesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    try {
      return await this.prisma.cliente.create({
        data: createClienteDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar cliente');
    }
  }

  async findAll(): Promise<Cliente[]> {
    try {
      return await this.prisma.cliente.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar clientes');
    }
  }

  async findOne(id: string): Promise<Cliente | null> {
    try {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id },
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar cliente');
    }
  }

  async remove(id: string): Promise<Cliente> {
    try {
      const cliente = await this.prisma.cliente.delete({
        where: { id },
      });
      if (!cliente) {
        throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
      }
      return cliente;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover cliente');
    }
  }
}
