import { CreateServicoDto } from "src/servico/dto/create-servico.dto";

export class CreatePacoteDto {
    id: number;
    servicos: CreateServicoDto[];
    desconto: number;
    valorFinal: number;
}
