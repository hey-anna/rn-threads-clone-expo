import { usePathname, useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets(); // 만약 안되는 경우 콘솔에 안되는 이유 확인해주는 역할

  console.log("pathname", pathname);
  console.log("insets", insets);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.tabContainer}>
        <View style={styles.tab}>
          <TouchableOpacity onPress={() => router.navigate(`/`)}>
            <Text style={{ color: pathname === "/" ? "red" : "black" }}>For you</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.navigate(`/following`)}>
            <Text style={{ color: pathname === "/" ? "black" : "red" }}>Following</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/@heyanna/post/1`)}>
            <Text>게시글1</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/@heyanna/post/2`)}>
            <Text>게시글2</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.push(`/@heyanna/post/3`)}>
            <Text>게시글3</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
  },
});
