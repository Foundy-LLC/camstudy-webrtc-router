class MediaServer {

    constructor(
        private readonly _ip: string,
        private readonly _port: number,
        private _runningRoomIds: string[],
        private readonly _maxRoomCount: number
    ) {
    }

    public get roomCount(): number {
        return this._runningRoomIds.length;
    }

    public addRoom = (id: string) => {
        this._runningRoomIds = [...this._runningRoomIds, id];
    }

    public removeRoom = (id: string) => {
        this._runningRoomIds = this._runningRoomIds.filter((e) => e !== id);
    }

    public canAddRoom = (): boolean => {
        return this.roomCount < this._maxRoomCount;
    }

    public hasRoom = (roomId: string): boolean => {
        return this._runningRoomIds.some((id) => id === roomId);
    }
}
