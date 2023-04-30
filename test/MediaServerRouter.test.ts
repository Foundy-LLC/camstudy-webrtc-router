import {MediaServerRepository} from "../src/MediaServerRepository";
import {MediaServer} from "../src/model/MediaServer";
import {fakeAvailableMediaServer, fakeFulledMediaServer} from "./fake/MediaServer.fake";
import {MediaServerRouter} from "../src/MediaServerRouter";

describe("MediaServerRouter.findAvailableServer", () => {

    test("should return media server when there is available sever", () => {
        // given
        const mediaServerBySocketId: Map<string, MediaServer> = new Map();
        mediaServerBySocketId.set("id1", fakeAvailableMediaServer);
        mediaServerBySocketId.set("id2", fakeFulledMediaServer);
        const repository = new MediaServerRepository(mediaServerBySocketId);
        const router = new MediaServerRouter(repository);

        // when
        const mediaServer = router.findAvailableServer();

        // then
        expect(mediaServer).toBe(fakeAvailableMediaServer);
    });

    test("should return undefined when there is fulled sever only", () => {
        // given
        const mediaServerBySocketId: Map<string, MediaServer> = new Map();
        mediaServerBySocketId.set("id2", fakeFulledMediaServer);
        const repository = new MediaServerRepository(mediaServerBySocketId);
        const router = new MediaServerRouter(repository);

        // when
        const mediaServer = router.findAvailableServer();

        // then
        expect(mediaServer).toBeUndefined();
    });

    test("should return undefined when there is no server", () => {
        // given
        const mediaServerBySocketId: Map<string, MediaServer> = new Map();
        const repository = new MediaServerRepository(mediaServerBySocketId);
        const router = new MediaServerRouter(repository);

        // when
        const mediaServer = router.findAvailableServer();

        // then
        expect(mediaServer).toBeUndefined();
    });
});
