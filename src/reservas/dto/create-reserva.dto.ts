import { IsNotEmpty, IsString, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({
    description: 'ID do filme associado',
    example: '47be5913-1884-497c-8dea-07008d79fb6e',
  })
  @IsNotEmpty()
  @IsString()
  filme_id: string;

  @ApiProperty({
    description: 'ID do cliente associado',
    example: '34be5913-1884-497c-8dea-07008d79fb7e',
  })
  @IsNotEmpty()
  @IsString()
  cliente_id: string;

  @ApiProperty({
    description: 'Data de expiração da reserva',
    example: '2024-07-29T05:32:24.000Z',
  })
  @IsNotEmpty()
  @IsDateString()
  expiresAt: string;
}
