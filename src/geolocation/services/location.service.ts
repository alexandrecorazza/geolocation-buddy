import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateLocationDto } from '../dto/create-location.dto';
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

  async create(createLocationDto: CreateLocationDto): Promise<Geolocation> {
    return await this.geolocationModel.create(createLocationDto);
  }
}
