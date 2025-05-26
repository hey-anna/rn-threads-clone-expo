// import { Slot } from "expo-router"; // 목적 : 화면 공유하는데 tab만 바뀌는거 그거를 의도 Slot
import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import {
  type MaterialTopTabNavigationEventMap,
  type MaterialTopTabNavigationOptions,
  createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import type { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        {/* activity 동일구조 S */}
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        )}
        <SideMenu isVisible={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
        {/* activity 동일구조 E */}
      </View>
      <View style={styles.profile}>
        <View style={styles.profileHeader}>
          <Image source={{ uri: user?.profileImageUrl }} style={styles.profileAvatar} />
          <Text>{user?.name}</Text>
          <Text>{user?.id}</Text>
          <Text>{user?.description}</Text>
        </View>
      </View>
      <MaterialTopTabs
        screenOptions={{
          lazy: true,
          tabBarStyle: {
            backgroundColor: "white",
            shadowColor: "transparent",
            position: "relative",
          },
          tabBarPressColor: "transparent",
          tabBarActiveTintColor: "#555",
          tabBarIndicatorStyle: {
            backgroundColor: "black",
            height: 1,
          },
          tabBarIndicatorContainerStyle: {
            backgroundColor: "#aaa",
            position: "absolute",
            top: 48,
            height: 1,
          },
        }}
      >
        <MaterialTopTabs.Screen name="index" options={{ title: "Threads" }} />
        <MaterialTopTabs.Screen name="replies" options={{ title: "Replies" }} />
        <MaterialTopTabs.Screen name="reposts" options={{ title: "Reposts" }} />
      </MaterialTopTabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  menuButton: {
    padding: 8,
  },
  profile: {
    padding: 16,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  profileAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});

// export default Slot; // Slot만 return하면 줄여서도 사용할 수 있다
