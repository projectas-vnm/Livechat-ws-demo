import { Module } from '@nestjs/common';
import { SocketModule } from './modules/sockets/socket.module';
import { MessageModule } from './modules/messages/message.module';

@Module({
  imports: [SocketModule, MessageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
