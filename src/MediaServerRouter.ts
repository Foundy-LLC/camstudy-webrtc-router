import {MediaServerRepository} from "./MediaServerRepository";
import {MediaServer} from "./model/MediaServer";
import {MediaRouterStatus} from "./model/MediaRouterStatus";

export class MediaServerRouter {

    public constructor(
        private _repository: MediaServerRepository = new MediaServerRepository()
    ) {
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

    public findServerByRoomId = (roomId: string): MediaServer | undefined => {
        const mediaServers = this._repository.getMediaServers();
        return mediaServers.find((server) => server.hasRoom(roomId));
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

    public getStatus = (): MediaRouterStatus => {
        return new MediaRouterStatus(this._repository.getMediaServers());
    }
}

export const mediaServerRouter = new MediaServerRouter();
