export class MessageDto {
    // Nội dung tin nhắn
    content: string;

    // Loại nội dung tin nhắn
    contentType: string;

    // Id đoạn hội thoại
    conversationId: string;

    // Id tin nhắn trả lời
    replyToMessage: string;
};
