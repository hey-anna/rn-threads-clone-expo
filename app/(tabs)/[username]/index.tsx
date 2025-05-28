// 기존 (tab)에 있을때와
// 폴더 [usename] 만들어 index.tsx로 변경해서 넣으면 동일한 역할해준다
// TouchableOpacity 버튼 같은거
import { AuthContext } from "@/app/_layout";
import { usePathname } from "expo-router";
import { useContext } from "react";
import { Image, Pressable, StyleSheet, Text, useColorScheme, View } from "react-native";

export default function Index() {
  // const { username } = useLocalSearchParams(); // [usename] 대괄호로 감싸진 실제 값을 받아 올 수 있다 @zerocho
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  console.log(pathname);
  const { user } = useContext(AuthContext);

  return (
    <View style={[styles.container, colorScheme === "dark" ? styles.containerDark : styles.containerLight]}>
      {pathname === "/undefined" && (
        <View style={styles.postInputContainer}>
          <Image source={{ uri: user?.profileImageUrl }} style={styles.profileAvatar} />
          <Text style={colorScheme === "dark" ? styles.postInputTextDark : styles.postInputTextLight}>
            What&apos;s new?
          </Text>
          <Pressable
            style={[styles.postButton, colorScheme === "dark" ? styles.postButtonDark : styles.postButtonLight]}
          >
            <Text
              style={[
                styles.postButtonText,
                colorScheme === "dark" ? styles.postButtonTextDark : styles.postButtonTextLight,
              ]}
            >
              Post
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  containerDark: {
    backgroundColor: "#101010",
  },
  containerLight: {
    backgroundColor: "white",
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  postInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#aaa",
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 22,
    position: "absolute",
    right: 0,
  },
  postButtonLight: {
    backgroundColor: "black",
  },
  postButtonDark: {
    backgroundColor: "white",
  },
  postButtonText: {
    fontSize: 16,
    fontWeight: "800",
  },
  postButtonTextLight: {
    color: "white",
  },
  postButtonTextDark: {
    color: "black",
  },
  postInputText: {
    fontSize: 16,
    fontWeight: "600",
  },
  postInputTextLight: {
    color: "black",
  },
  postInputTextDark: {
    color: "#aaa",
  },
});
