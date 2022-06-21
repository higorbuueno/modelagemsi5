import { Module } from '@nestjs/common';
import { ServicoService } from './servico.service';
import { ServicoController } from './servico.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servico } from './entities/servico.entity';
import { ServicoRepository } from './servico.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Servico, ServicoRepository])],
  controllers: [ServicoController],
  providers: [ServicoService],
  exports: [ServicoService]
})
export class ServicoModule {}
