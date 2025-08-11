import { ArgumentsHost, Catch, ExceptionFilter, Logger } from "@nestjs/common";
import { WsException } from "@nestjs/websockets";
import { Socket } from "socket.io";

@Catch()
export class GlobalWsExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalWsExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToWs();
        const client: Socket = ctx.getClient<Socket>();

        let message = "Unknown error";
        let event = "error";

        if (exception instanceof WsException) {
            const errorResponse = exception.getError();
            message = typeof errorResponse === "string" ? errorResponse : (errorResponse as any)?.message || "Unknown WebSocket error";
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }

        this.logger.error(`Socket error: ${message}`);

        client.emit(event, {
            status: "error",
            message
        });
    }
}
