import { Injectable } from "@nestjs/common";
import { MessageDto } from "./dtos/message.dto";

@Injectable()
export class MessageService {
    async InsertMessage(body: MessageDto) {
        console.log(body.conversation_id);
    }
}
