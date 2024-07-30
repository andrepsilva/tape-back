import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateClienteDto {
  @ApiProperty({
    description: 'Nome do cliente',
    example: 'João Silva',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do cliente',
    example: 'joao.silva@example.com',
  })
  @IsString()
  email: string;

  @ApiPropertyOptional({
    description: 'Telefone do cliente',
    example: '1234567890',
  })
  @IsOptional()
  @IsString()
  telefone?: string;
}
