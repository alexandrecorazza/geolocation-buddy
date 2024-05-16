import { CoordinatesType } from '../types/CoordinatesType';

export class CreateLocationDto {
  readonly description: string;
  readonly opened?: string;
  readonly closed?: string;
  readonly coordinates: CoordinatesType;
}
