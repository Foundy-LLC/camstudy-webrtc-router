import express from "express";
import http from "http";
import {Server, Socket} from "socket.io";
import {MediaServerRouter} from "./MediaServerRouter";
import {MediaServerRegisterRequest, toMediaServer} from "./model/MediaServerRegisterRequest";
import {ResponseBody} from "./model/ResponseBody";
import {MediaServerGetResponse} from "./model/MediaServerGetResponse";

const app = express();
const server = http.createServer(app);
const PORT = 9999; // TODO: Env로 대체

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});

// Media server register

const io = new Server(server);
io.on("connection", (socket: Socket) => {
    const mediaServerRouter = MediaServerRouter.getInstance();

    console.log("A media server has connected.");

    socket.on("disconnect", () => {
        mediaServerRouter.unregister(socket.id);
        console.log("A media server has disconnected.");
    });

    socket.on("registerMediaServer", (request: MediaServerRegisterRequest) => {
        mediaServerRouter.register(socket.id, toMediaServer(request));
        console.log(`Registered a media server ${request.ip} with ${request.maxRoomCapacity} room capacity.`);
    });

    socket.on("createdRoom", (roomId: string) => {
        mediaServerRouter.addRoom(socket.id, roomId);
    });

    socket.on("removedRoom", (roomId: string) => {
        mediaServerRouter.removeRoom(socket.id, roomId);
    });
});

// Client request handler

app.get('/media-server', (req, res) => {
    try {
        const router = MediaServerRouter.getInstance();
        const mediaServer = router.findAvailableServer();
        if (mediaServer == null) {
            res.status(404).send(new ResponseBody({message: "가용한 미디어 서버가 존재하지 않습니다."}));
            return;
        }
        res.status(200).send(new ResponseBody<MediaServerGetResponse>({
            message: "접속 가능한 미디어 서버 정보를 성공적으로 얻었습니다.",
            data: {
                ip: mediaServer.ip,
                port: mediaServer.port,
            }
        }));
    } catch (e) {
        res.status(500).send(new ResponseBody({message: "서버 내부 에러가 발생했습니다."}))
    }
});
