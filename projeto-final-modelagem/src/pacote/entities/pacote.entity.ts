import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pacotes')
export class Pacote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    desconto: number;

    @Column()
    valor_final: number;

    @Column()
    cliente: number;
}
