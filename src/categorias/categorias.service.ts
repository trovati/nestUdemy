import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categoria } from './interfaces/categorias.interface';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>) {}

  // eslint-disable-next-line prettier/prettier
  async criarCategoria(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const { categoria } = criarCategoriaDto;
    // eslint-disable-next-line prettier/prettier
    const categoriaEncontrada = await this.categoriaModel.findOne({ categoria }).exec();

    if (categoriaEncontrada) {
        // eslint-disable-next-line prettier/prettier
        throw new BadRequestException(`Categoria ${categoria} já encontrada!!`)
    }
    const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
    return await categoriaCriada.save();
  }
}
