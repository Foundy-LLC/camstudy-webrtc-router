class MediaServer {

    constructor(
        private readonly ip: string,
        private readonly port: number,
        private runningRooms: number,
        private readonly maxRoomCount: number
    ) {
    }

    public increaseRunningRoom = () => {
        this.runningRooms++;
    }

    public decreaseRunningRoom = () => {
        this.runningRooms--;
    }

    public canCreateRoom = (): boolean => {
        return this.runningRooms < this.maxRoomCount
    }
}
