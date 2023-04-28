import express from "express";
import http from "http";
import {Server, Socket} from "socket.io";
import {MediaServerRouter} from "./MediaServerRouter";
import {MediaServerRegisterRequest, toMediaServer} from "./model/MediaServerRegisterRequest";

const app = express();
const server = http.createServer(app);

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
});

const PORT = 9999;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
