import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CoordenatesType } from '../types/CoordenatesType';

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
  coordenates: CoordenatesType;
}

export const GeolocationSchema = SchemaFactory.createForClass(Geolocation);
