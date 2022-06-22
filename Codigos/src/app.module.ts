import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configDatabaseService } from './config/config.service';
import { PacoteModule } from './pacote/pacote.module';
import { ServicoModule } from './servico/servico.module';
import { FilmeModule } from './filme/filme.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configDatabaseService.getTypeOrmConfig()),
    PacoteModule,
    ServicoModule,
    FilmeModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
