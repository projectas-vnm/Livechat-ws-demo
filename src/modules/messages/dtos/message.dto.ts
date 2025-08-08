export class MessageDto {
    // Người gửi
    senderName: string;

    // Id người gửi
    senderId: string;

    // Nội dung tin nhắn
    content: string;

    // Loại nội dung tin nhắn
    contentType: string;

    // Id đoạn hội thoại
    conversationId: string;

    // Id tin nhắn trả lời
    replyToMessage: string;

    // Loại tin nhắn
    messageType: string;
};
