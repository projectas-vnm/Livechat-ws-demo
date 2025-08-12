# Kết nối: 

- domain: 

# Method:

- Tham gia phòng chat:
    + Tên method: roomJoin
    + Loại method: emit
    + payload: Object { 
        conversationId: Id conversation 
    }

- Rời khỏi phòng chat:
    + Tên method: roomLeave
    + Loại method: emit
    + payload: Object { 
        conversationId: Id conversation 
    }

- Gửi tin nhắn đến phòng chat (Dành cho visitor):
    + Tên method: sendMessage
    + Loại method: emit
    + payload: Object {
        senderName: Tên người gửi tin nhắn;
        senderId: Id người gửi tin nhắn;
        content: nội dung tin nhắn;
        contentType: loại nội dung (tin nhắn, tin nhắn có chứa hình ảnh, tin nhắn có chứa file);
        conversationId: Id conversation;
        replyToMessage: Id tin nhắn trả lời (nếu có);
    }

- Nhận tin nhắn:
    + Tên method: recvMessage
    + Loại method: on
    + data: Object {
        senderName: Tên người gửi tin nhắn;
        senderId: Id người gửi tin nhắn;
        content: nội dung tin nhắn;
        contentType: loại nội dung (tin nhắn, tin nhắn có chứa hình ảnh, tin nhắn có chứa file);
        conversationId: Id conversation;
        replyToMessage: Id tin nhắn trả lời (nếu có);
    }
