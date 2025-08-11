import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConversationService } from "./conversation.service";
import { ConversationRepository } from "./conversation.repository";
import { Conversation, ConversationSchema } from "./schemas/conversation.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
    controllers: [],
    providers: [ConversationRepository, ConversationService],
    exports: [ConversationService],
})
export class ConversationModule { }
