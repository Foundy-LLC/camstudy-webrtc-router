import {MediaServerRepository} from "./MediaServerRepository";
import {MediaServer} from "./MediaServer";

export class MediaServerRouter {

    private static _instance: MediaServerRouter;

    private _repository: MediaServerRepository = new MediaServerRepository()

    private constructor() {
    }

    public static getInstance(): MediaServerRouter {
        if (!MediaServerRouter._instance) {
            MediaServerRouter._instance = new MediaServerRouter();
        }
        return MediaServerRouter._instance;
    }

    public register = (socketId: string, mediaServer: MediaServer) => {
        this._repository.register(socketId, mediaServer);
    }

    public unregister = (socketId: string) => {
        this._repository.unregister(socketId);
    }

    public addRoom = (socketId: string, roomId: string) => {
        const mediaServer = this._repository.requireMediaServerBySocketId(socketId);
        mediaServer.addRoom(roomId);
    }

    public removeRoom = (socketId: string, roomId: string) => {
        const mediaServer = this._repository.requireMediaServerBySocketId(socketId);
        mediaServer.removeRoom(roomId);
    }

    public findAvailableServer = (): MediaServer | undefined => {
        const mediaServers = this._repository.getMediaServers()
        let fewestRoomsServer: MediaServer | undefined;
        let fewestRoomCount = Number.MAX_SAFE_INTEGER;
        for (const mediaServer of mediaServers) {
            if (mediaServer.canAddRoom() && mediaServer.roomCount < fewestRoomCount) {
                fewestRoomsServer = mediaServer;
                fewestRoomCount = mediaServer.roomCount;
            }
        }
        return fewestRoomsServer;
    }
}