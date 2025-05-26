import { StyleSheet, Text, View } from "react-native";
// 기존 (tab)에 있을때와
// 폴더 [usename] 만들어 index.tsx로 변경해서 넣으면 동일한 역할해준다
// TouchableOpacity 버튼 같은거

export default function Index() {
  // const { username } = useLocalSearchParams(); // [usename] 대괄호로 감싸진 실제 값을 받아 올 수 있다 @zerocho

  return (
    <View style={styles.tabBar}>
      <Text>Threads will be here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
