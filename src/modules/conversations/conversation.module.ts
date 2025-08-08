import { Module } from "@nestjs/common";
import { ConversationService } from "./conversation.service";

@Module({
    imports: [],
    controllers: [],
    providers: [ConversationService],
    exports: [ConversationService],
})
export class ConversationModule { }
