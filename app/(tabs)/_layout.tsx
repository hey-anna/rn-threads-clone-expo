// afterLogin이 아닌 외부 레이아웃은 로그인 전 공통 레이아웃 활용
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";

export default function TabLayout() {
  const router = useRouter();

  return (
    // 커스텀 아이징
    // 네비 순서 변경 하고 싶은 경우 Screen 추가
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Ionicons name="home" size={24} color={focused ? "black" : "gray"} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Ionicons name="search" size={24} color={focused ? "black" : "gray"} />,
        }}
      />
      <Tabs.Screen
        name="add"
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
            router.navigate("/modal");
          },
        }}
        options={{
          // presentation: "modal",
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Ionicons name="add" size={24} color={focused ? "black" : "gray"} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Ionicons name="heart-outline" size={24} color={focused ? "black" : "gray"} />,
        }}
      />
      <Tabs.Screen
        name="[username]"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => <Ionicons name="person-outline" size={24} color={focused ? "black" : "gray"} />,
        }}
      />
      <Tabs.Screen
        name="(post)/[username]/post/[postID]"
        options={{
          href: null,
        }}
      />
      {/* <Tabs.Screen
        name="following"
        options={{
          tabBarLabel: () => null,
          href: null, // following 네비바에서 없애기
        }}
      /> */}
    </Tabs>
  );
}
