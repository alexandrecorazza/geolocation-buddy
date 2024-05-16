import { CoordenatesType } from '../types/CoordenatesType';

export class GetLocationByNearbyDto {
  readonly coordenates: CoordenatesType;
  readonly mts: number;
  readonly time?: string;
}
