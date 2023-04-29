import express from "express";
import http from "http";
import {Server, Socket} from "socket.io";
import {mediaServerRouter} from "./MediaServerRouter";
import {MediaServerRegisterRequest, toMediaServer} from "./model/MediaServerRegisterRequest";
import {ResponseBody} from "./model/ResponseBody";
import {MediaServerGetResponse} from "./model/MediaServerGetResponse";
import {CREATED_ROOM, REGISTER_MEDIA_SERVER, REMOVED_ROOM} from "./constant/protocol";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT!

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

// Media server register

const io = new Server(server);
io.on("connection", (socket: Socket) => {

    console.log("A media server has connected.");

    socket.on("disconnect", () => {
        mediaServerRouter.unregister(socket.id);
        console.log("A media server has disconnected.");
    });

    socket.on(REGISTER_MEDIA_SERVER, (request: MediaServerRegisterRequest, successCallback: () => void) => {
        mediaServerRouter.register(socket.id, toMediaServer(request));
        console.log(`Registered a media server ${socket.id} with ${request.maxRoomCapacity} room capacity.`);
        successCallback();
    });

    socket.on(CREATED_ROOM, (roomId: string) => {
        mediaServerRouter.addRoom(socket.id, roomId);
        console.log(`Added a room: ${roomId} to ${socket.id} socket.`);
    });

    socket.on(REMOVED_ROOM, (roomId: string) => {
        mediaServerRouter.removeRoom(socket.id, roomId);
        console.log(`Removed a room: ${roomId} from ${socket.id} socket.`);
    });
});

// Client request handler

app.get('/rooms/:roomId/media-server', (req, res) => {
    try {
        const roomId = req.params.roomId;
        const mediaServer = mediaServerRouter.findServerByRoomId(roomId) ?? mediaServerRouter.findAvailableServer();
        if (mediaServer == null) {
            res.status(404).send(new ResponseBody({message: "가용한 미디어 서버가 존재하지 않습니다."}));
            return;
        }
        res.status(200).send(new ResponseBody<MediaServerGetResponse>({
            message: "접속 가능한 미디어 서버 정보를 성공적으로 얻었습니다.",
            data: {
                url: mediaServer.url,
            }
        }));
    } catch (e) {
        console.log(e);
        res.status(500).send(new ResponseBody({message: "서버 내부 에러가 발생했습니다."}))
    }
});
