import {MediaServer} from "../MediaServer";

export interface MediaServerRegisterRequest {
    readonly ip: string;
    readonly port: number;
    readonly maxRoomCapacity: number;
}

export const toMediaServer = (request: MediaServerRegisterRequest): MediaServer => {
    return new MediaServer(
        request.ip,
        request.port,
        [],
        request.maxRoomCapacity,
    )
}
