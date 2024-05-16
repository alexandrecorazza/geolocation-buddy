import { CoordinatesType } from '../types/CoordinatesType';

export class GetLocationByNearbyDto {
  readonly coordinates: CoordinatesType;
  readonly mts: number;
  readonly time?: string;
}
