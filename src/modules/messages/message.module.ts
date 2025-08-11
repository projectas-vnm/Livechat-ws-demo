import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MessageService } from "./message.service";
import { MessageRepository } from "./message.repository";
import { Message, MessageSchema } from "./schemas/message.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }])],
    controllers: [],
    providers: [MessageRepository, MessageService],
    exports: [MessageService],
})
export class MessageModule { }
