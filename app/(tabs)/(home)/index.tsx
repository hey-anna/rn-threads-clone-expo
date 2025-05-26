import {
  // usePathname,
  useRouter,
} from "expo-router";
import {
  // Dimensions,
  //  PixelRatio,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {} from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  // const pathname = usePathname();
  // const insets = useSafeAreaInsets(); // 만약 안되는 경우 콘솔에 안되는 이유 확인해주는 역할

  // console.log("pathname", pathname);
  // console.log("insets", insets);

  // const { width, height } = Dimensions.get("window");

  // console.log(`화면 너비: ${width}dp, 높이: ${height}dp`);
  // console.log(`픽셀 화면 너비: ${width * PixelRatio.get()}px, 픽셀 높이: ${height * PixelRatio.get()}px`);

  return (
    <View>
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
  );
}
