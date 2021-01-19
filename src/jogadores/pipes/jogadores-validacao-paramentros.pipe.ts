// eslint-disable-next-line prettier/prettier
import { ArgumentMetadata, BadRequestException, PipeTransform } from '@nestjs/common';

export class JogadoresValidacaoParamentrosPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException(
        `O valor do paramentro ${metadata.data} deve ser informado`,
      );
    }

    return value;
  }
}
