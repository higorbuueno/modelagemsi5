import { Injectable } from '@nestjs/common';
import { CreateFilmeDto } from './dto/create-filme.dto';
import { UpdateFilmeDto } from './dto/update-filme.dto';
import { FilmeRepository } from './filme.repository';

@Injectable()
export class FilmeService {

  constructor(
    private filmeRepository: FilmeRepository
  ){}

  findAll() {
    return this.filmeRepository.query(
      `select * from filmes`
    );
  }

  findByidPacoteServico(idPacoteServico: number) {
    return this.filmeRepository.query(
    `select * from filmes_pacotes_servicos WHERE idPacoteServico = ${idPacoteServico}`,
    );
  }

}
