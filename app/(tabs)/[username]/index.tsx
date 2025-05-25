import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// 기존 (tab)에 있을때와
// 폴더 [usename] 만들어 index.tsx로 변경해서 넣으면 동일한 역할해준다
// TouchableOpacity 버튼 같은거

export default function Index() {
  const router = useRouter();
  const { username } = useLocalSearchParams(); // [usename] 대괄호로 감싸진 실제 값을 받아 올 수 있다 @zerocho
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
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
      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity onPress={() => router.push(`/${username}`)}>
            <Text>Threads</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/${username}/replies`)}>
            <Text>Replies</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/${username}/reposts`)}>
            <Text>Reposts</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    height: 50,
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profile: {},
  profileHeader: {},
  profileAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
