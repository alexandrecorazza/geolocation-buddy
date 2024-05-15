import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Geolocation } from '../schemas/geolocation.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Geolocation.name)
    private readonly geolocationModel: Model<Geolocation>,
  ) {}

  async findAllLocations(): Promise<Geolocation[]> {
    return this.geolocationModel.find().exec();
  }
}
