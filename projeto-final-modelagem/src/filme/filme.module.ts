import { Module } from '@nestjs/common';
import { FilmeService } from './filme.service';
import { FilmeController } from './filme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filme } from './entities/filme.entity';
import { FilmeRepository } from './filme.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Filme, FilmeRepository])],
  controllers: [FilmeController],
  providers: [FilmeService]
})
export class FilmeModule {}
