// afterLogin이 아닌 외부 레이아웃은 로그인 전 공통 레이아웃 활용
import { Ionicons } from "@expo/vector-icons";
import type { BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import { useContext, useRef, useState } from "react";
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../_layout";
// Animated.delay // 앞에 한거 끝난뒤에 얼마나 간격을 줄지
// Animated.parallel // 동시에 하는거
// Animated.sequence // 순차적으로 하는거
// Animated.stagger // parallel + delay 섞어놓은거, 정해진 시간마다 하나씩 실행 // 앞뒤 상관없이 실행될 수 있다

const AnimatedTabBarButton = ({
  children,
  onPress,
  style,
  accessibilityState,
  accessibilityLabel,
  testID,
  android_ripple, // 따로 꺼냄
  onLongPress, // 따로 꺼냄
}: // ...restProps // 세개의 props만 꺼낼때 나머지
BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        useNativeDriver: true, // 이거를 켜둬야지 자바스크립트 스레드가 아니라 GPT 같은 걸 사용해서 자바스크립트 블로킹 스레드없이 사용할 수있기 때문에 , 애니메이션이 헤비한 작업이기때문에 왠마하면 켜두는게 좋다
        speed: 200,
        // friction: 4, // 높을 수록 스프링 효과가 적다 friction speed 같이 못쓴다
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 200,
      }),
    ]).start();
  };
  // console.log("restProps", restProps);
  // console.log("AnimatedTabBarButton props", { children, onPress, style, ...restProps });
  return (
    <Pressable
      // {...restProps} // 삭제 처리
      onPress={onPress} // 클릭하는것
      onLongPress={onLongPress}
      // onPressIn={handlePressIn} // 마우스 다운 누를때
      onPressOut={handlePressOut} // 뗄때
      style={[{ flex: 1, justifyContent: "center", alignItems: "center" }, style]}
      // Disable Android ripple effect (안드로이드 기본 물결 퍼져나가는것을 없애준다)
      // android_ripple={{ borderless: false, radius: 0 }}
      android_ripple={android_ripple}
      accessibilityState={accessibilityState}
      accessibilityLabel={accessibilityLabel}
      testID={testID}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>{children}</Animated.View>
    </Pressable>
  );
};

export default function TabLayout() {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user; // 유저가 있냐 없냐 판단
  console.log("user", user, "isLoggedIn", isLoggedIn);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  // 로그인 모달
  const toLoginPage = () => {
    setIsLoginModalOpen(false);
    router.push("/login");
  };

  // 커스텀 아이징
  // 네비 순서 변경 하고 싶은 경우 Screen 추가
  return (
    <>
      <Tabs
        backBehavior="history"
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
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
            <Pressable onPress={toLoginPage}>
              <Text>Login Modal</Text>
            </Pressable>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
