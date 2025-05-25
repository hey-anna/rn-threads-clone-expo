import "expo-router/entry";

import { createServer, Response, Server } from "miragejs";

// 타입스크립트에 윈도우라는 타입에 서버라는걸 추가하는 문법 : 타입에러 없애기 위한것
declare global {
  interface Window {
    server: Server;
  }
}

// __DEV__ : 지금 개발 모드, 배포한 상태 아닐 때만 실행하는 변수
if (__DEV__) {
  if (window.server) {
    window.server.shutdown();
  }

  // (schema, request) 매개변수 로 requestBody를 받아 올 수 있다

  window.server = createServer({
    routes() {
      this.post("/login", (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody);

        // 아이디와 비밀번호가 일치하면 이정보들은 넘겨주고
        if (username === "heyanna" && password === "1234") {
          return {
            accessToken: "access-token",
            refreshToken: "refresh-token",
            user: {
              id: "heyanna",
              name: "heyanna",
              description: "Sonny lover, programmer, blogger",
              profileImageUrl: "https://avatars.githubusercontent.com/u/885857?v=4",
            },
          };
        } else {
          return new Response(401, {}, { message: "Invalid credentials" });
        }
      });
    },
  });
}
