import { CoordenatesType } from '../types/CoordenatesType';

export class CreateLocationDto {
  readonly description: string;
  readonly opened?: string;
  readonly closed?: string;
  readonly coordenates: CoordenatesType;
}
