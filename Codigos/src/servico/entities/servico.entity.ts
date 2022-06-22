import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('servicos')
export class Servico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  valor: number;

  @Column()
  franquia: number;
  
  @Column()
  premium: string;
}
