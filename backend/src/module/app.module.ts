import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { AppService } from '../service/app.service';
import { AuthModule } from './auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../service/jwt-auth.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: 5432,
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        schema: 'public',
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: JwtAuthGuard,
    },
    AppService
  ],
})
export class AppModule {}