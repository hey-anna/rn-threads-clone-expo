// afterLogin이 아닌 외부 레이아웃은 로그인 전 공통 레이아웃 활용
import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const isLoggedIn = true; // 로그인 여부 판단
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 커스텀 아이징
  // 네비 순서 변경 하고 싶은 경우 Screen 추가
  return (
    <>
      <Tabs
        backBehavior="history"
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
              if (isLoggedIn) {
                router.navigate("/modal");
              } else {
                openLoginModal();
              }
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
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => <Ionicons name="heart-outline" size={24} color={focused ? "black" : "gray"} />,
          }}
        />
        <Tabs.Screen
          name="[username]"
          listeners={{
            tabPress: (e) => {
              if (!isLoggedIn) {
                e.preventDefault();
                openLoginModal();
              }
            },
          }}
          options={{
            tabBarLabel: () => null,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="person-outline" size={24} color={focused ? "black" : "gray"} />
            ),
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
      <Modal visible={isLoginModalOpen} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>Login Modal</Text>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
