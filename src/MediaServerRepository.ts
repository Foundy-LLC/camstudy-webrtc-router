import {MediaServer} from "./MediaServer";

export class MediaServerRepository {

    constructor(
        private readonly _mediaServerBySocketId: Map<string, MediaServer> = new Map()
    ) {
    }

    public register = (socketId: string, mediaServer: MediaServer) => {
        this._mediaServerBySocketId.set(socketId, mediaServer);
    }

    public unregister = (socketId: string) => {
        this._mediaServerBySocketId.delete(socketId);
    }

    public getMediaServers = (): MediaServer[] => {
        return [...this._mediaServerBySocketId.values()]
    }
}
