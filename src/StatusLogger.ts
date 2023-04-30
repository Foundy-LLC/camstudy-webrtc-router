import {mediaServerRouter} from "./MediaServerRouter";

class StatusLogger {

    private readonly _intervalMilli = 1000 * 60 * 5; // 5 minutes
    private _timer?: NodeJS.Timer;

    public startLogging = () => {
        if (this._timer != null) {
            clearInterval(this._timer);
        }
        this._timer = setInterval(() => {
            const routerStatus = mediaServerRouter.getStatus();
            console.log(`
――――――――――――――――――――STATUS――――――――――――――――――――――
${new Date()}
Media server count: ${routerStatus.mediaServerCount}
Room capacity sum : ${routerStatus.roomCapacitySum}
Running room count: ${routerStatus.runningRoomCount}
Room usage        : ${routerStatus.roomUsagePercentage}%
――――――――――――――――――――――――――――――――――――――――――――――――    
    `.trim())
        }, this._intervalMilli)
    }
}

export const statusLogger = new StatusLogger();
