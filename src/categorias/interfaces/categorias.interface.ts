import { Document } from 'mongoose';
import { Jogador } from 'src/jogadores/Interfaces/jogador.interface';

// eslint-disable-next-line prettier/prettier

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Categoria extends Document {
  readonly categoria: string;
  descricao: string;
  eventos: Array<Evento>;
  jogadores: Array<Jogador>;
}

export interface Evento {
  nome: string;
  operacao: string;
  valor: number;
}
