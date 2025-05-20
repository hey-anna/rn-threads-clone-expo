import { useLocalSearchParams, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// 기존 (tab)에 있을때와
// 폴더 [usename] 만들어 index.tsx로 변경해서 넣으면 동일한 역할해준다
// TouchableOpacity 버튼 같은거

export default function Index() {
  const router = useRouter();
  const { username } = useLocalSearchParams(); // [usename] 대괄호로 감싸진 실제 값을 받아 올 수 있다 @zerocho
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
  );
}
