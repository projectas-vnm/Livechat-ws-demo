import { Module } from "@nestjs/common";
import { MessageModule } from "src/modules/messages/message.module";
import { SocketGateway } from "./socket.gateway";
import { ConversationModule } from "../conversations/conversation.module";

@Module({
    imports: [MessageModule, ConversationModule],
    providers: [SocketGateway],
    controllers: [],
    exports: [],
})
export class SocketModule { }
