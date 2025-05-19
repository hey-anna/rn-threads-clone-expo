import { Stack } from "expo-router"; // modal option presentation이 tab에서 안되고 Stack에서만 된다

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}
// 전체 레이아웃에는 구지 화면 안넣더라도 구글 에널리틱스 or 초기화 or 권한 얻기 등 공통 레이아웃 있을 때 활용
// Stack에서 Slot으로 변경하면 (tabs 부분이 사라진다)
