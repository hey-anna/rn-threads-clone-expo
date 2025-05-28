import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router"; // modal option presentation이 tab에서 안되고 Stack에서만 된다
import * as SecureStore from "expo-secure-store";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export interface User {
  id: string;
  name: string;
  profileImageUrl: string;
  description: string;
  link?: string;
  showInstagramBadge?: boolean;
  isPrivate?: boolean;
}

export const AuthContext = createContext<{
  user: User | null;
  login?: () => Promise<any>;
  logout?: () => Promise<any>;
  updateUser?: (user: User) => void;
}>({
  user: null,
});

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    console.log("login");
    return fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        username: "heyanna",
        password: "1234",
      }),
    })
      .then((res) => {
        console.log("res", res, res.status);
        if (res.status >= 400) {
          return Alert.alert("Error", "Invalid credentials");
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data);

        // 전부다 프로미스라서 프로미스로 묶어준다
        return Promise.all([
          setUser(data.user),
          SecureStore.setItemAsync("accessToken", data.accessToken),
          SecureStore.setItemAsync("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)),
        ]);
      })
      .catch(console.error);
  };

  const logout = () => {
    setUser(null);
    return Promise.all([
      SecureStore.deleteItemAsync("accessToken"),
      SecureStore.deleteItemAsync("refreshToken"),
      AsyncStorage.removeItem("user"),
    ]);
  };

  const updateUser = (user: User) => {
    setUser(user);
    AsyncStorage.setItem("user", JSON.stringify(user));
  };

  // 앱을 껏다가 켜도 로그인이 유지되어야 한다
  // 유지하기 위해
  // 만약 AsyncStorage에 유저가 있다면 setUser 해주기
  useEffect(() => {
    AsyncStorage.getItem("user").then((user) => {
      setUser(user ? JSON.parse(user) : null);
    });
    // TODO: validating access token - 엑세스 토큰이 유효한지 검사 추천(캐시, 한달 만료, 검사만료, 유저없애주기)
    // 앱 켤때마다 AsyncStorage 그대로 가져다 쓰되 검사는 꼭 한번 해보세요
  }, []);

  return (
    <AuthContext value={{ user, login, logout, updateUser }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* 커스텀아이징 할때만 여기에 추가해주면 된다 */}
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </AuthContext>
  );
}
// 전체 레이아웃에는 구지 화면 안넣더라도 구글 에널리틱스 or 초기화 or 권한 얻기 등 공통 레이아웃 있을 때 활용
// Stack에서 Slot으로 변경하면 (tabs 부분이 사라진다)

// home, Login, modal 이런얘들은 구지 안적어도 자동으로 추가되어 있다
// 커스텀아이징 필요할 때만 presentation options 이런거 붙일때만 직접 추가해주면 된다.
// 안적어주면 무시되는 것이 아니라, 자동으로 Expo Router가 파일기반으로 Stack의 일부구나하고 파악을 한다
