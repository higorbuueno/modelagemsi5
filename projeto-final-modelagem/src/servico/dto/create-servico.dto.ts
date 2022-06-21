import { CreateFilmeDto } from "src/filme/dto/create-filme.dto";

export class CreateServicoDto {
    id: number;
    nome: string;
    valor: number;
    franquia: number;
    premium: boolean;
    filmes?: CreateFilmeDto[];
    velocidade: number;
}