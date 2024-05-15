import { Module } from '@nestjs/common';
import { LocationModule } from './geolocation/location.module';

@Module({
  imports: [LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
