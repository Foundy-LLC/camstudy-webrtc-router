export class MediaServer {

    constructor(
        private readonly _ip: string,
        private readonly _port: number,
        private _runningRoomIds: string[] = [],
        private readonly _maxRoomCapacity: number
    ) {
    }

    public get url(): string {
        return `http://${this._ip}:${this._port}`;
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

    public hasRoom = (id: string): boolean => {
        return this._runningRoomIds.some((e) => e === id);
    }
}
