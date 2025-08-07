export class MessageDto {
    // Nội dung tin nhắn
    content: string;

    // Loại nội dung tin nhắn
    content_type: string;

    // Id đoạn hội thoại
    conversation_id: string;

    // Id tin nhắn trả lời
    reply_to_message: string;
};
