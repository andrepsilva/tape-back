// src/app.module.ts
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { FilmesModule } from './filmes/filmes.module';
import { GenerosModule } from './generos/generos.module';
import { ReservasModule } from './reservas/reservas.module';
import { LocacoesModule } from './locacoes/locacoes.module';
import { ClientesModule } from './clientes/clientes.module';

@Module({
  imports: [
    PrismaModule,
    UsuariosModule,
    FilmesModule,
    GenerosModule,
    ReservasModule,
    LocacoesModule,
    ClientesModule
  ],
})
export class AppModule {}
