import {
    ConnectedSocket,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { MessageDto } from "src/modules/messages/dtos/message.dto";
import { MessageService } from "src/modules/messages/message.service";
import { SOCKET_EVENTS } from "./constants/socket-events.constant";

@WebSocketGateway({ cors: { origin: "*" } })
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    private authenticatedClients = new Set<string>();
    private authTimeouts = new Map<string, NodeJS.Timeout>();

    constructor(private readonly messageService: MessageService) { }

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
    async handleRoomJoin(@ConnectedSocket() client: Socket, @MessageBody() payload: { room: string }) {
        const { room } = payload;
        await client.join(room);
    }

    /**
     * Rời khỏi phòng
     * @param client Client kết nối
     * @param payload Dữ liệu của gửi lên
     */
    @SubscribeMessage(SOCKET_EVENTS.ROOM_LEAVE)
    async handleRoomLeave(@ConnectedSocket() client: Socket, @MessageBody() payload: { room: string }) {
        const { room } = payload;
        await client.leave(room);
    }

    /**
     * Gửi tin nhắn
     * @param client Client kết nối
     * @param payload Dữ liệu của gửi lên
     */
    @SubscribeMessage(SOCKET_EVENTS.SEND_MESSAGE)
    async handleRoomMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: MessageDto) {
        const { conversationId } = payload;

        await this.messageService.InsertMessage(payload);

        this.server.to(conversationId).emit(SOCKET_EVENTS.RECV_MESSAGE, payload);
    }
}
