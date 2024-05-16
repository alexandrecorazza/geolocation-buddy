import { CoordinatesType } from './CoordinatesType';

export type LocationType = {
  description: string;
  opened?: string;
  closed?: string;
  coordinates: CoordinatesType;
};
