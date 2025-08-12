import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { UseFilters } from "@nestjs/common";
import { Server, Socket } from "socket.io";
import { CreateMessageDto } from "src/modules/messages/dtos/create-message.dto";
import { MessageService } from "src/modules/messages/message.service";
import { GlobalWsExceptionFilter } from "src/commons/exceptions/global.exception";
import { SOCKET_EVENTS } from "./constants/socket-events.constant";
import { ConversationService } from "../conversations/conversation.service";

@WebSocketGateway({ cors: { origin: "*" } })
@UseFilters(GlobalWsExceptionFilter)
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private authenticatedClients = new Set<string>();
    private authTimeouts = new Map<string, NodeJS.Timeout>();

    constructor(
        private readonly messageService: MessageService,
        private readonly conversationService: ConversationService
    ) { }

    /**
     * Khi client kết nối
     * @param client Client kết nối
     */
    async handleConnection(client: Socket) {
        // const timeout = setTimeout(() => {
        //     if (!this.authenticatedClients.has(client.id)) {
        //         client.emit(SOCKET_EVENTS.AUTH_TIMEOUT, { message: "Authentication timeout. Disconnected." });
        //         client.disconnect();
        //     }
        // }, 10000);

        // this.authTimeouts.set(client.id, timeout);
    }

    /**
     * Khi client ngắt kết nối
     * @param client Client kết nối
     */
    async handleDisconnect(client: Socket) {
        // this.authenticatedClients.delete(client.id);

        // const timeout = this.authTimeouts.get(client.id);
        // if (timeout) {
        //     clearTimeout(timeout);
        //     this.authTimeouts.delete(client.id);
        // }
    }

    /**
     * Tham gia phòng
     * @param client Client kết nối
     * @param payload Dữ liệu của gửi lên
     */
    @SubscribeMessage(SOCKET_EVENTS.ROOM_JOIN)
    async handleRoomJoin(@ConnectedSocket() client: Socket, @MessageBody() payload: { conversationId: string }) {
        const { conversationId } = payload;

        await client.join(conversationId);

        //this.server.to(conversationId).emit(SOCKET_EVENTS.RECV_ROOM_UPDATE, conversationInfo);
    }

    /**
     * Rời khỏi phòng
     * @param client Client kết nối
     * @param payload Dữ liệu của gửi lên
     */
    @SubscribeMessage(SOCKET_EVENTS.ROOM_LEAVE)
    async handleRoomLeave(@ConnectedSocket() client: Socket, @MessageBody() payload: { conversationId: string }) {
        const { conversationId } = payload;

        await client.leave(conversationId);
    }

    /**
     * Gửi tin nhắn
     * @param client Client kết nối
     * @param payload Dữ liệu của gửi lên
     */
    @SubscribeMessage(SOCKET_EVENTS.SEND_MESSAGE)
    async handleRoomMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: CreateMessageDto) {
        const { conversationId } = payload;

        //await this.messageService.InsertMessage(payload);

        this.server.to(conversationId).emit(SOCKET_EVENTS.RECV_MESSAGE, payload);
    }
}
