import {MediaServer} from "./MediaServer";

export class MediaRouterStatus {

    public readonly mediaServerCount: number;
    public readonly roomCapacitySum: number;
    public readonly runningRoomCount: number;
    public readonly roomUsagePercentage: number;

    public constructor(
        mediaServers: MediaServer[]
    ) {
        let roomCapacitySum = 0;
        let runningRoomCount = 0;
        mediaServers.forEach((server) => {
            roomCapacitySum += server.maxRoomCapacity;
            runningRoomCount += server.roomCount;
        });
        this.mediaServerCount = mediaServers.length;
        this.roomCapacitySum = roomCapacitySum;
        this.runningRoomCount = runningRoomCount;
        if (roomCapacitySum === 0) {
            this.roomUsagePercentage = 0;
        } else {
            this.roomUsagePercentage = Math.floor((runningRoomCount / roomCapacitySum) * 100);
        }
    }
}
