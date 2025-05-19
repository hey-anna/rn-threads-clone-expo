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

---

## Join the community

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
