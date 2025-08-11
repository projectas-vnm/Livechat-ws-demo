import {
    Prop,
    Schema,
    SchemaFactory
} from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Base } from "src/commons/schemas/_base.schemas";

@Schema({ timestamps: true })
export class Conversation extends Base {
    @Prop({ required: true })
    conversationName: string;

    @Prop({ required: true })
    conversationType: string;

    @Prop()
    search: string;

    @Prop()
    status: string;

    @Prop({ ref: "Message" })
    lastMessageId: string;

    @Prop({ required: true, ref: "Visitor" })
    visitorId: string;

    @Prop({ ref: "User" })
    agentId: string;
}

export type ConversationDocument = HydratedDocument<Conversation>;

export const ConversationSchema = SchemaFactory.createForClass(Conversation);