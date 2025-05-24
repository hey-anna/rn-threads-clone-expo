import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect, router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { AuthContext } from "./_layout";
// import { useContext } from "react";

export default function Login() {
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;

  // RN도 요청 보내는 fetch 존재
  // index.ts에서 받아 올 수 있다
  // fetch 400이어도 성공한것으로 뜬다
  const onLogin = () => {
    console.log("login");
    fetch("/login", {
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
          SecureStore.setItemAsync("accessToken", data.accessToken), // 비밀
          SecureStore.setItemAsync("refreshToken", data.refreshToken),
          AsyncStorage.setItem("user", JSON.stringify(data.user)), // 문자열만 됨
        ]);
      })
      .then(() => {
        router.push("/(tabs)");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }
  return (
    <View style={{ paddingTop: insets.top }}>
      <Pressable onPress={() => router.back()}>
        <Text>Back</Text>
      </Pressable>
      <Pressable style={styles.loginButton} onPress={onLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
  },
});
