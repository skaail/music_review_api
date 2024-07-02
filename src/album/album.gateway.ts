import { WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Album } from "./entities/album.entity";

@WebSocketGateway({
    cors: {
        origin: 'http://localhost:3000', // Your Next.js frontend URL
        methods: ['GET', 'POST'],
        credentials: true,
    },
})
export class AlbumsGateway {

    @WebSocketServer()
    server: Server

    notifyNewAlbum(album: Album) {
        this.server.emit('newAlbum', album)
    }
}