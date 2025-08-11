import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SocketModule } from './modules/sockets/socket.module';
import { MessageModule } from './modules/messages/message.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get("MONGODB_URI"),
        dbName: configService.get("MONGODB_DB_NAME"),
      }),
      inject: [ConfigService],
    }),
    SocketModule,
    MessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
