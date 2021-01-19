// eslint-disable-next-line prettier/prettier
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { Categoria } from './interfaces/categorias.interface';

@Controller('api/v1/categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async criarCategoria(
      // eslint-disable-next-line prettier/prettier
      @Body() criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    return await this.categoriasService.criarCategoria(criarCategoriaDto);
  }
}
