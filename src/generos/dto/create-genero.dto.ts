import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGeneroDto {
  @ApiProperty({
    description: 'Nome do gênero',
    example: 'Ação',
  })
  @IsString()
  nome: string;
}
