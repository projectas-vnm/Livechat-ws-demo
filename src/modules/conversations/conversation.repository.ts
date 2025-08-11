import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/commons/repositories/base.repository';
import { Conversation, ConversationDocument } from './schemas/conversation.schema';

@Injectable()
export class ConversationRepository extends BaseRepository<ConversationDocument> {
    constructor(@InjectModel(Conversation.name) private readonly conversationModel: Model<ConversationDocument>) {
        super(conversationModel);
    }
}