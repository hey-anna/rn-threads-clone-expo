import NotFound from "@/app/+not-found";
import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// NotFound GPT가 notFound import할 수 있다고 뜨는데 대표적인 할루시네이션(hallucination)
// notFound 이런 함수 없다 항상 조심 hallucination
// 대괄호 라우터 모든것에 걸리니 주의하시오

export default function Index() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 주소를 알아야 한다
  const insets = useSafeAreaInsets();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const isLoggedIn = !!user;

  // 주소 잘못 입력 할 시 notFound로 보내야 한다
  // 검사 해주기
  // ai가 자동완성 해주니 추후 프로젝트 할때는 필수

  if (
    ![
      "/activity",
      "/activity/follows",
      "/activity/replies",
      "/activity/mentions",
      "/activity/quotes",
      "/activity/reposts",
      "/activity/verified",
    ].includes(pathname)
  ) {
    return <NotFound />;
  }

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
      <View style={styles.tabBar}>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity`)}>
            <Text style={{ color: pathname === "/activity" ? "red" : "black" }}>All</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/follows`)}>
            <Text
              style={{
                color: pathname === "/activity/follows" ? "red" : "black",
              }}
            >
              Follows
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/replies`)}>
            <Text
              style={{
                color: pathname === "/activity/replies" ? "red" : "black",
              }}
            >
              Replies
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/mentions`)}>
            <Text
              style={{
                color: pathname === "/activity/mentions" ? "red" : "black",
              }}
            >
              Mentions
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/quotes`)}>
            <Text style={{ color: pathname === "/activity/quotes" ? "red" : "black" }}>Quotes</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/reposts`)}>
            <Text
              style={{
                color: pathname === "/activity/reposts" ? "red" : "black",
              }}
            >
              Reposts
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace(`/activity/verified`)}>
            <Text
              style={{
                color: pathname === "/activity/verified" ? "red" : "black",
              }}
            >
              Verified
            </Text>
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
});
