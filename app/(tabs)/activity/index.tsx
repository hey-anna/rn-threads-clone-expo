import NotFound from "@/app/+not-found";
import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

// NotFound GPT가 notFound import할 수 있다고 뜨는데 대표적인 할루시네이션(hallucination)
// notFound 이런 함수 없다 항상 조심 hallucination
// 대괄호 라우터 모든것에 걸리니 주의하시오

export default function Index() {
  const router = useRouter();
  const pathname = usePathname(); // 현재 주소를 알아야 한다

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
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
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
  );
}
