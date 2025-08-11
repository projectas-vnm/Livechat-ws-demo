export class GetConversationInfoDto {
    // Id cuộc hội thoại
    conversationId: string;

    // Tên cuộc hội thoại
    conversationName: string;

    // Phân loại hội thoại
    conversationType: string = "customerSupport";

    // Id khách
    visitorId: string;

    // Tên khách
    visitorName: string;

    // Id nhân viên
    agentId: string;

    // Tên nhân viên
    agentName: string;
};