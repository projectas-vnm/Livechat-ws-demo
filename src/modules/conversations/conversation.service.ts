import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { GetConversationInfoDto } from './dtos/get-conversation-info.dto';
import { ConversationRepository } from './conversation.repository';
import { ConversationDocument } from './schemas/conversation.schema';

@Injectable()
export class ConversationService {
    constructor(
        private readonly conversationRepository: ConversationRepository,
    ) { }

    async upsertConversation(createDto: CreateConversationDto): Promise<GetConversationInfoDto> {
        const { conversationId } = createDto;

        let conversation: (ConversationDocument) | null = null;

        if (conversationId && Types.ObjectId.isValid(conversationId)) {
            conversation = await this.conversationRepository.findOne(conversationId);
        }

        if (!conversation) {
            conversation = await this.conversationRepository.create(createDto);
        }

        const response = new GetConversationInfoDto();
        response.conversationId = conversation._id.toString();
        response.conversationName = conversation.conversationName;
        response.conversationType = "customerSupport";
        response.visitorId = conversation.visitorId?.toString() || '';
        response.visitorName = "sdfgsdfg";
        response.agentId = conversation.agentId?.toString() || '';
        response.agentName = "sdsadfs";

        return response;
    }
}
