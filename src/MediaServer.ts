export class MediaServer {

    constructor(
        private readonly _ip: string,
        private readonly _port: number,
        private _runningRoomIds: string[] = [],
        private readonly _maxRoomCapacity: number
    ) {
    }

    public get ip(): string {
        return this._ip;
    }

    public get port(): number {
        return this._port;
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
        return this.roomCount < this._maxRoomCapacity;
    }

    public hasRoom = (roomId: string): boolean => {
        return this._runningRoomIds.some((id) => id === roomId);
    }
}
