export class MediaServerRepository {

    private static instance: MediaServerRepository;

    private readonly _mediaServerBySocketId: Map<string, MediaServer> = new Map();

    private constructor() {
    }

    public static getInstance(): MediaServerRepository {
        if (!MediaServerRepository.instance) {
            MediaServerRepository.instance = new MediaServerRepository();
        }
        return MediaServerRepository.instance;
    }

    public register = (socketId: string, mediaServer: MediaServer) => {
        this._mediaServerBySocketId.set(socketId, mediaServer);
    }

    public unregister = (socketId: string) => {
        this._mediaServerBySocketId.delete(socketId);
    }
}
