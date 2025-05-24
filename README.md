# threads-clone

제로초 React Native 강의 기반으로 진행한 Threads 클론 앱입니다.  
React Native + Expo 기반으로 구성되어 있으며, 실습을 통해 앱 구조와 기능을 익히는 데 목적이 있습니다.

---

## 📆 Version Info

- First created on: **2025.05**
- 제로초 강의 실습용으로 생성된 클론 프로젝트입니다.
- Expo Router, Dev Client, React Navigation 등의 기본 설정 완료 상태입니다.

---

## 📌 기술 스택

### ⚙️ 개발 환경

- **프레임워크**: Expo (React Native)
- **라우팅**: Expo Router
- **패키지 매니저**: Yarn, npx 혼용
- **프로그래밍 언어**: TypeScript

### 🛠️ 개발 도구 및 설정

#### 🎨 스타일 라이브러리

| 라이브러리                       | 설명                                                                                                                                                       |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `react-native-safe-area-context` | 기기 노치, 상태바, 홈 인디케이터 등을 피해서 콘텐츠를 안전하게 배치할 수 있도록 도와주는 Safe Area 관련 라이브러리 (`SafeAreaView`, `useSafeAreaInsets()`) |
| `expo-blur`                      | 화면 뒤 배경이 비쳐 보이도록 블러 처리할 수 있는 라이브러리 (`BlurView`)                                                                                   |
| `expo-location`                  | 사용자의 위치 정보를 가져올 수 있는 라이브러리 (getCurrentPositionAsync, requestForegroundPermissionsAsync 등)                                             |

---

## 📜 설치 및 실행 명령어

```bash
# 프로젝트 생성
npx create-expo-app@latest threads-clone

# 플랫폼별 실행
expo start --android
yarn android          # Android 에뮬레이터 실행
yarn ios              # iOS 시뮬레이터 실행
yarn web              # 웹 브라우저에서 실행

# 프로젝트 초기화
yarn reset-project   # node ./scripts/reset-project.js 실행

# Expo EAS 설정
yarn global add eas-cli
eas login
eas build:configure
eas build --platform android --profile development
```

---

## 📦 추가 설치 명령어

```bash
npx expo install react-native-safe-area-context
npx expo install expo-blur
npx expo install expo-location
```

---

## 🔗 참고 문서

- [Expo](https://expo.dev)
- [Expo documentation](https://docs.expo.dev/)
- [Expo guides](https://docs.expo.dev/guides)
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/)
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo
- [file-based routing](https://docs.expo.dev/router/introduction)
- [Expo Icons Explorer](https://icons.expo.fyi/) – `@expo/vector-icons` 아이콘 검색

---

## Join the community

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
