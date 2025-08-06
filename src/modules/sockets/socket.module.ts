import { Module } from "@nestjs/common";
import { MessageModule } from "src/modules/messages/message.module";
import { SocketGateway } from "./socket.gateway";

@Module({
    imports: [MessageModule],
    providers: [SocketGateway],
    controllers: [],
    exports: [],
})
export class SocketModule { }