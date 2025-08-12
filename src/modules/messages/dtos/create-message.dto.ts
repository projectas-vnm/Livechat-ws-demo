import { IsOptional } from "class-validator";

export class CreateMessageDto {
    // Người gửi
    senderName: string;

    // Id người gửi
    senderId: string;

    // Loại tin nhắn
    @IsOptional()
    senderType: string;

    // Nội dung tin nhắn
    content: string;

    // Loại nội dung tin nhắn
    contentType: string;

    // Id đoạn hội thoại
    conversationId: string;

    // Id tin nhắn trả lời
    @IsOptional()
    replyToMessage: string;
};
