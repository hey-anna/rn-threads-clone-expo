import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import { Dimensions, Image, PixelRatio, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets(); // 만약 안되는 경우 콘솔에 안되는 이유 확인해주는 역할
  const isLoggedIn = false;

  console.log("pathname", pathname);
  console.log("insets", insets);

  const { width, height } = Dimensions.get("window");

  console.log(`화면 너비: ${width}dp, 높이: ${height}dp`);
  console.log(`픽셀 화면 너비: ${width * PixelRatio.get()}px, 픽셀 높이: ${height * PixelRatio.get()}px`);

  return (
    // <SafeAreaView style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}> 강사님과 다르게 useSafeAreaInsets 이거 적용안함 여백차이가 나서,
    <SafeAreaView style={styles.container}>
      <BlurView style={styles.header} intensity={70}>
        <Image source={require("../../../assets/images/react-logo.png")} style={styles.headerLogo} />
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton} onPress={() => router.navigate(`/login`)}>
            <Text style={styles.loginButtonColor}>로그인</Text>
          </TouchableOpacity>
        )}
      </BlurView>
      {isLoggedIn && (
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
        </View>
      )}
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
    alignItems: "center",
  },
  header: {
    alignItems: "center", // 기본 flexDirection이 컬럼이라 justifyContent 대신 이거 사용, 위치가 바껴있다 기억
  },
  headerLogo: {
    width: 42, // DP, DIP 단위(기기 독립 픽셀)
    height: 42,
  },
  loginButton: {
    position: "absolute",
    right: 20,
    top: 0,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  loginButtonColor: {
    color: "white", // 컬러는 웹과 다르게 따로 넣어줘서 적용한다 Text에 직접 넣기
  },
});
