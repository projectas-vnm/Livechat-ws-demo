import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Base } from "src/libs/dtos/_base.dto";

@Schema({ timestamps: true })
export class Message extends Base {
    @Prop({ required: true })
    content: string;

    @Prop({ required: true })
    content_type: string;

    @Prop({ required: true })
    conversation_id: string;

    @Prop()
    reply_to_message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
