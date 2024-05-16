import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoordinatesType } from '../types/CoordinatesType';

export type GeolocationDocument = HydratedDocument<Geolocation>;

@Schema()
export class Geolocation {
  @Prop({ required: true })
  description: string;

  @Prop()
  opened: string;

  @Prop()
  closed: string;

  @Prop({ type: Object, required: true })
  coordinates: CoordinatesType;
}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation);
