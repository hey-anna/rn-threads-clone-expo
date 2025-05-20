import { Redirect } from "expo-router";

// (tabs)인덱스로 되돌아가게 만들어주기
// Redirect expor router에 있는것
export default function Home() {
  return <Redirect href="/(tabs)" />;
}
