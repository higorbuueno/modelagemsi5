import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('filmes')
export class Filme {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  isLancamento: boolean;
  
  @Column()
  valor: number;
}
