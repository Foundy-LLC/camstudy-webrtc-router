# camstudy-webrtc-router

공부방에 접속하려는 클라이언트에게 특정 [미디어 서버](https://github.com/Foundy-LLC/camstudy-webrtc-server)를 배정하는 역할을 담당합니다.

## How to work with Client?

### 참여하려는 공부방이 아직 개설되지 않은 경우

1. 개설된 공부방 갯수가 가장 적은 미디어 서버를 선택
2. 해당 미디어 서버의 URL을 클라이언트에게 응답

### 참여하려는 공부방이 이미 개설된 경우

1. 개설된 공부방이 포함된 미디어 서버 탐색
2. 해당 미디어 서버의 URL을 클라이언트에게 응답

## How to work with Media Server?

1. 미디어 서버 AWS 인스턴스 생성
2. 미디어 서버 Docker 배포
3. 미디어 서버가 라우팅 서버에게 본인의 서버 URL을 보내며 소켓 연결
4. 라우팅 서버는 미디어 서버의 URL과 개설된 공부방 ID들을 가짐
5. 미디어 서버와 라우팅 서버의 소켓 연결이 끊어지면 라우팅 서버는 해당 미디어 서버를 제거
