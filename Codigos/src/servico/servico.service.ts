import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from './dto/create-servico.dto';
import { UpdateServicoDto } from './dto/update-servico.dto';
import { ServicoRepository } from './servico.repository';

@Injectable()
export class ServicoService {

  constructor(
    private servicoRepository: ServicoRepository,
    ) {}


  create(createServicoDto: CreateServicoDto) {
    return 'This action adds a new servico';
  }

  findAll() {
    return `This action returns all servico`;
  }

  findOne(id: number) {
    return `This action returns a #${id} servico`;
  }

  update(id: number, updateServicoDto: UpdateServicoDto) {
    return `This action updates a #${id} servico`;
  }

  remove(id: number) {
    return `This action removes a #${id} servico`;
  }

  async findServicosByIdPacote(id: number){
    // const servicos = await this.servicoRepository.query(`select * from servicos WHERE idPacote = ${id}`);
    // console.log(servicos)
  }
}
