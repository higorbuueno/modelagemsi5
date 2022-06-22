import { Module } from '@nestjs/common';
import { PacoteService } from './pacote.service';
import { PacoteController } from './pacote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pacote } from './entities/pacote.entity';
import { PacoteRepository } from './pacotes.repository';
// import { FilmeService } from 'src/filme/filme.service';
// import { ServicoService } from 'src/servico/servico.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pacote, PacoteRepository]),
    // ServicoService,
    // FilmeService
  ],
  controllers: [PacoteController],
  providers: [PacoteService],
})
export class PacoteModule {}
