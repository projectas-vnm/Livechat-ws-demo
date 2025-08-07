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
    constructor(private readonly messageService: MessageService) { }

    async handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    async handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage(SOCKET_EVENTS.ROOM_JOIN)
    async handleRoomJoin(@ConnectedSocket() client: Socket, @MessageBody() payload: { room: string }) {
        const { room } = payload;
        await client.join(room);

        // this.server.to(room).emit(SOCKET_EVENTS.ROOM_UPDATE, {
        //     users: this.chatService.getUsersInRoom(room),
        // });
    }

    @SubscribeMessage(SOCKET_EVENTS.ROOM_LEAVE)
    async handleRoomLeave(@ConnectedSocket() client: Socket, @MessageBody() payload: { room: string }) {
        const { room } = payload;
        await client.leave(room);

        // this.server.to(room).emit(SOCKET_EVENTS.ROOM_UPDATE, {
        //     users: this.chatService.getUsersInRoom(room)
        // });
    }

    @SubscribeMessage(SOCKET_EVENTS.ROOM_MESSAGE)
    async handleRoomMessage(@ConnectedSocket() client: Socket, @MessageBody() payload: MessageDto) {
        const { conversation_id } = payload;
        await this.messageService.InsertMessage(payload);
        this.server.to(conversation_id).emit(SOCKET_EVENTS.MESSAGE_RECEIVE, payload);
    }
}
