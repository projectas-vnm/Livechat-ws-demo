import {
    Prop,
    Schema,
    SchemaFactory
} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "src/commons/dtos/_base.dto";

@Schema({ timestamps: true })
export class Message extends Base {
    @Prop({ required: true })
    senderId: string;

    @Prop({ required: true })
    senderType: string;

    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    contentType: string;

    @Prop({ required: true })
    conversationId: string;

    @Prop()
    replyToMessage: string;
}

export type MessageDocument = HydratedDocument<Message>;

export const MessageSchema = SchemaFactory.createForClass(Message);
