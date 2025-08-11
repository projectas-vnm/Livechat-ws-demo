export function verifyHashingSocketRequest(hashData: string, data: string): Boolean {
    return true;
}

export function hashSocketRequest(data: string): string {
    return data;
}

export function getJoinRoomPatternHashing(conversationId: string): string {
    return `joinRoom:${conversationId}`;
}

export function getMessagePatternHashing(
    content: string,
    contentType: string,
    conversationId: string
): string {
    return `message:${content}&${contentType}&${conversationId}`;
}