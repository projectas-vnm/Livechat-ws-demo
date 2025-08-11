export class CreateConversationDto {
    // Id cuộc hội thoại
    conversationId: string;

    // Tên cuộc hội thoại
    conversationName: string;

    // Phân loại hội thoại
    conversationType: string = "customerSupport";

    visitorId: string;
};
