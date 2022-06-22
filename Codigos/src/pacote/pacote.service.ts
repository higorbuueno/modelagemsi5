import { Injectable } from '@nestjs/common';
import { CreateServicoDto } from 'src/servico/dto/create-servico.dto';
import { IdDeServicos } from 'src/shared/enum/servicos.enum';
// import { ServicoService } from 'src/servico/servico.service';
import { CreatePacoteDto } from './dto/create-pacote.dto';
import { PacoteRepository } from './pacotes.repository';

@Injectable()
export class PacoteService {
  // Professor, tivemos um problema com o ORM que não soubemos resolver
  // Então utilizamos queries para realizar as buscas na base.
  
  // Acessar o link: http://localhost:3000/pacote/(algum id de 1 a 4) que são os que cadastramos para fazer o teste e mostrar os valores retornando corretamente.

  constructor(
    private pacoteRepository: PacoteRepository, // private servicoService: ServicoService
  ) {}

  async findOne(id: number) {
    // Pegando pacote com o id informado:
    var pacote = await this.pacoteRepository.query(
      `select * from pacotes WHERE id = ${id}`,
    );
    pacote = pacote[0];

    // Pegando os servicos do pacote:
    const pacoteServicos = await this.pacoteRepository.query(
      `select * from pacotes_servicos WHERE idPacote = ${id}`,
    );

    // Pegando os id dos servicos para buscar na base:
    var listaIdServicos: number[] = [];
    var servicos: any;
    pacoteServicos.forEach((item) => {
      listaIdServicos.push(item.idServico);
    });

    // Buscando serviços na base
    servicos = await this.pacoteRepository.query(
      `SELECT * FROM servicos WHERE id IN (${listaIdServicos})`,
    );

    // Pegando valor dos servicos e vendo franquias para calcular valores sobresalentes.
    servicos.forEach((servico) => {
      // Somando valor do serviço no valor final do pacote
      pacote.valor_final += servico.valor;

      // Verificando se franquia utilizada passou da franquia contratada e aplicando sobressalência no valor final.
      pacoteServicos.forEach((pacoteServico) => {
        if(pacoteServico.idServico === servico.id && (pacoteServico.franquiaUtillizada - servico.franquia > 0)){
          pacote.valor_final += (pacoteServico.franquiaUtillizada - servico.franquia) * 0.01;
        }
      });
    });

    // Aplicando 5% de desconto para cada servico adicional.
    pacote.desconto = (pacoteServicos.length - 1) * 5;

    // Buscando se existe streaming de filmes:
    var existreStreaming: boolean = false;
    var idPacoteServicoStreamingFilmes: number;
    var listaIdFilmes: number[] = [];
    var filmes: any;
    var valorFilmes: number = 0;
    pacoteServicos.forEach((servico) => {
      if (servico.idServico === IdDeServicos.STREAMING_FILMES) {
        idPacoteServicoStreamingFilmes = servico.id;
        existreStreaming = true;
      }
    });

    // Buscando e pegando valor de filmes:
    var filmesPacoteServicos: any;
    if (existreStreaming) {
      filmesPacoteServicos = await this.pacoteRepository.query(
        `select * from filmes_pacotes_servicos WHERE idPacoteServico = ${idPacoteServicoStreamingFilmes}`,
      );

      // Obtendo id dos filmes para buscar na base.
      filmesPacoteServicos.forEach((item) => {
        listaIdFilmes.push(item.idFilme);
      });

      // Buscando filmes na base
      filmes = await this.pacoteRepository.query(
        `SELECT * FROM filmes WHERE id IN (${listaIdFilmes})`,
      );

      // Obtendo valor dos filmes
      filmes.forEach((filme) => {
        valorFilmes += filme.valor;
      });

      // Adicionando valor dos filmes ao valor final do pacote.
      pacote.valor_final += valorFilmes;
    }

    // Por fim, aplicando desconto no valor final.
    pacote.valor_final = pacote.valor_final * (1 - (pacote.desconto/100));

    console.log('Filmes contratados no streaming: ', filmes);

    // OBJETO FINAL: (QUE ESTÁ NO DIAGRAMA DE CLASSES).
    servicos.forEach((servico) => {
      if (servico.id === IdDeServicos.STREAMING_FILMES) {
        servico.filmes = filmes;
      }
    });

    // OBJETO FINAL: (QUE ESTÁ NO DIAGRAMA DE CLASSES).
    var servicoFinal: CreateServicoDto[] = servicos;
    var pacoteFinal: CreatePacoteDto = pacote;
    pacoteFinal.servicos = servicoFinal;
    console.log(pacote);
    
    return pacote;
  }
}
