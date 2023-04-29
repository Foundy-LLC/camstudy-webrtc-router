import {MediaServer} from "../../src/MediaServer";

export const fakeAvailableMediaServer = new MediaServer("123.123.12.232", 8080, ["1234"], 4);
export const fakeFulledMediaServer = new MediaServer("123.123.12.111", 3000, ["1111", "1112", "1113", "1114"], 4);
