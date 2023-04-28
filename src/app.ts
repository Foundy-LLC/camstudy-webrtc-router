import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server);

// Create an interface for the media server information
interface MediaServerInfo {
    ip: string;
    port: number;
    availableRooms: number;
}

// Create an object to store information about available media servers
const mediaServers: { [key: string]: MediaServerInfo } = {};

io.on("connection", (socket: Socket) => {
    console.log("A client has connected.");

    socket.on("disconnect", () => {
        console.log("A client has disconnected.");
    });

    socket.on("registerMediaServer", (info: MediaServerInfo) => {
        console.log(`Received registration from media server at ${info.ip}:${info.port}`);

        // Add the media server info to the mediaServers object
        const key = `${info.ip}:${info.port}`;
        mediaServers[key] = info;

        console.log(`Added media server ${key} with ${info.availableRooms} available rooms.`);
    });

    socket.on("requestRoomAddress", () => {
        console.log("Received request for room address.");

        // Find the media server with the most available rooms
        let selectedServer: MediaServerInfo | undefined;
        for (const key in mediaServers) {
            if (!selectedServer || mediaServers[key].availableRooms > selectedServer.availableRooms) {
                selectedServer = mediaServers[key];
            }
        }

        if (selectedServer) {
            // Decrement the availableRooms count for the selected server
            selectedServer.availableRooms--;

            // Send the selected server's IP address and port to the client
            socket.emit("roomAddress", {
                ip: selectedServer.ip,
                port: selectedServer.port,
            });

            console.log(`Sent room address ${selectedServer.ip}:${selectedServer.port}.`);
        } else {
            console.log("No available media servers.");
        }
    });
});

const PORT = 9999;
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
