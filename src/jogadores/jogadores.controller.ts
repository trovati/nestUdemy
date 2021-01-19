// eslint-disable-next-line prettier/prettier
import { Body, Controller, Delete, Get, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { Put } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Param } from '@nestjs/common/decorators/http/route-params.decorator';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './Interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { JogadoresValidacaoParamentrosPipe } from './pipes/jogadores-validacao-paramentros.pipe';

@Controller('api/v1/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async atualizarJogador(
    @Body() criaJogadorDto: CriarJogadorDto,
    // eslint-disable-next-line prettier/prettier
    @Param('_id', JogadoresValidacaoParamentrosPipe) _id: string): Promise<void> {
    await this.jogadoresService.atualizarJogador(_id, criaJogadorDto);
  }
  @Post()
  @UsePipes(ValidationPipe)
  // eslint-disable-next-line prettier/prettier
  async criarJogador(@Body() criaJogadorDto: CriarJogadorDto): Promise<Jogador> {
    return await this.jogadoresService.criarJogador(criaJogadorDto);
  }

  @Get()
  // eslint-disable-next-line prettier/prettier
  async consultarJogadores(): Promise<Jogador[]> {
    return await this.jogadoresService.consultarTodosJogadores();
  }

  @Get('/:_id')
  // eslint-disable-next-line prettier/prettier
  async consultarJogadoresPeloId(
    // eslint-disable-next-line prettier/prettier
    @Param('_id', JogadoresValidacaoParamentrosPipe) _id: string,
  ): Promise<Jogador[] | Jogador> {
    return await this.jogadoresService.consultarJogadorPeloId(_id);
  }

  @Delete('/:_id')
  // eslint-disable-next-line prettier/prettier
  async deletarJogador(@Param('_id', JogadoresValidacaoParamentrosPipe) _id: string,): Promise<void> {
    await this.jogadoresService.deletarJogador(_id);
  }
}
