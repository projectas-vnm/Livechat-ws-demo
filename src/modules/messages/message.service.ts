import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dtos/create-message.dto";
import { MessageRepository } from "./message.repository";

@Injectable()
export class MessageService {
    constructor(private readonly messageRepository: MessageRepository) { }

    async InsertMessage(createMessageDto: CreateMessageDto) {
        await this.messageRepository.create(createMessageDto);
    }
}
