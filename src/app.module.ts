import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { LocationModule } from './geolocation/location.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LocationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
