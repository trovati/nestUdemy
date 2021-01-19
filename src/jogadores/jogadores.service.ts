// eslint-disable-next-line prettier/prettier
import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './Interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  constructor(
    @InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>,
  ) {}

  private readonly logger = new Logger(JogadoresService.name);

  async criarJogador(criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    const { email } = criaJogadorDto;

    const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

    if (jogadorEncontrado) {
      throw new BadRequestException(
        `Jogador com e-mail ${email} já cadastrado`,
      );
    }
    const jogadorCriado = new this.jogadorModel(criaJogadorDto);
    return await jogadorCriado.save();
  }

  // eslint-disable-next-line prettier/prettier
  async atualizarJogador(_id: string, criarJogadorDto: CriarJogadorDto): Promise<void> {

    // eslint-disable-next-line prettier/prettier
    const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com ${_id} não foi encontrado!!`);
    }
    // eslint-disable-next-line prettier/prettier
    return await this.jogadorModel.findOneAndUpdate({_id},{ $set: criarJogadorDto },).exec();
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadorModel.find().exec();
    //return await this.jogadores;
  }

  async consultarJogadorPeloId(_id: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com id ${_id} não encontrado`);
    }
    return jogadorEncontrado;
  }

  async deletarJogador(_id): Promise<any> {
    const jogadorEncontrado = await this.jogadorModel.findOne({ _id }).exec();
    if (!jogadorEncontrado) {
      throw new NotFoundException(`Jogador com e-mail ${_id} não encontrado`);
    }
    return await this.jogadorModel.deleteOne({ _id }).exec();
    // const jogadorEncontrado = await this.jogadores.find(
    //   (jogador) => jogador.email === email,
    // );
    // this.jogadores = this.jogadores.filter(
    //   (jogador) => jogador.email !== jogadorEncontrado.email,
    // );
  }
}
