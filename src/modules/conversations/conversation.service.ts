import { Injectable } from "@nestjs/common";
import { ConversationDto } from "./dtos/conversation.dto";

@Injectable()
export class ConversationService {
    async InsertConversation(body: ConversationDto) {

    }
}
