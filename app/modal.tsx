import { FontAwesome, FontAwesome6, Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Thread {
  id: string; // 필수
  text: string; // 필수
  hashtag?: string; // 선택 - 기본값에서 빼둠 - 해시태그 하나
  location?: [number, number]; // 선택 - 기본값에서 빼둠 - 위치정보(위도, 경도)
  imageUris: string[]; // 필수 - 문자열 배열만 해두면 알아서 된다는게 웹과 차이점
  // 왜 문자열이지? RN에서는 파일 경로만 적으면 그걸 알아서 포스트할 때 실제 파일을 불러와서 포스트 해준다(파일이라해서 블록, 버퍼, 파일 객체 이런게 아니라 그냥 경로)
}

export function ListFooter({
  canAddThread, // props로 Thread를 추가 할 수 있는
  addThread, // 클릭하면 또 쓸 수 있는 거 나오게
}: {
  canAddThread: boolean; // 하나 입력하면 하나 더 입력되게
  addThread: () => void;
}) {
  return (
    <View style={styles.listFooter}>
      <View style={styles.listFooterAvatar}>
        <Image source={require("../assets/images/avatar.png")} style={styles.avatarSmall} />
      </View>
      <View>
        <Pressable onPress={addThread} style={styles.input}>
          <Text style={{ color: canAddThread ? "#999" : "#aaa" }}>Add to thread</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function Modal() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [threads, setThreads] = useState<Thread[]>([{ id: Date.now().toString(), text: "", imageUris: [] }]);
  // 여기 지금 빠져 있는게 해시태그랑 위치정보 Location 이거까지 들어 있을 수 있다
  // Thread를 한번에 여러개 올릴 수 있어서 Thread[]로 해둠
  // ID는 지금 현재 시간이지만, 실무에서는 당연히 고유값을 넣어줘야 한다 - UUID , 나노ID 이런거 고유한 값으로 만들어야 겹치지 않는다

  const [selectedHashtagThreadId, setSelectedHashtagThreadId] = useState<string | null>(null);
  const [hashtagInput, setHashtagInput] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);

  const [replyOption, setReplyOption] = useState("Anyone");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const handleCancel = () => {
    if (isPosting) return;
    router.back();
  };

  const handlePost = () => {};

  // hashtag input
  // const updateThreadText = (id: string, text: string) => {
  //   setThreads((prevThreads) => prevThreads.map((thread) => (thread.id === id ? { ...thread, text } : thread)));
  // };

  // hashtag input
  const updateThreadText = (id: string, text: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) => {
        if (thread.id !== id) return thread;

        const shouldClearHashtag = thread.hashtag && !text.includes(`${thread.hashtag}`);
        return {
          ...thread,
          text,
          ...(shouldClearHashtag ? { hashtag: undefined } : {}), // hashtag도 같이 지움
        };
      })
    );
  };

  const insertHashtag = (id: string, tag: string) => {
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id ? { ...thread, text: `${thread.text.trim()} #${tag}`, hashtag: tag } : thread
      )
    );
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  // 마지막거 텍스트의 길이가 0보다 큰지로 판단
  // 마지막 Thread에 텍스트 길이가 차 있으면
  // 괄호까지 묶어줘야 확실히 불리언이 된다
  const canAddThread = (threads.at(-1)?.text.trim().length ?? 0) > 0;

  // 모든 쓰레드의 텍스트가 가득차 있을때 되게
  const canPost = threads.every((thread) => thread.text.trim().length > 0);

  // 필터로 해당아이템 지우기
  const removeThread = (id: string) => {
    setThreads((prevThreads) => prevThreads.filter((thread) => thread.id !== id));
  };

  const pickImage = async (id: string) => {};

  const takePhoto = async (id: string) => {};

  const removeImageFromThread = (id: string, uriToRemove: string) => {};

  // granted : 권한 있는거

  // 위도 경도 지도 위치
  const getMyLocation = async (id: string) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    console.log("getMyLocation", status);
    if (status !== "granted") {
      // 제목 - 상세 - onPress 순 만들기
      Alert.alert("Location permission not granted", "Please grant location permission to use this feature", [
        {
          text: "Open settings",
          onPress: () => {
            Linking.openSettings(); // 권한 실패시
          },
        },
        {
          text: "Cancel",
        },
      ]);
      return;
    }

    const location = await Location.getCurrentPositionAsync({}); // 권한을 받은 경우 뜨면
    const address = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      // latitude:37.53,
      // longitude:127.02
    });
    console.log("address", address);
    setThreads((prevThreads) =>
      prevThreads.map((thread) =>
        thread.id === id
          ? {
              ...thread,
              location: [location.coords.latitude, location.coords.longitude], // 이거 추가해주면 위치정보 받아온다
            }
          : thread
      )
    );
  };

  // renderThreadItem
  const renderThreadItem = ({
    item, // props
    index, // props 받아서
  }: {
    item: Thread; // 타입 스레드
    index: number; // 타입 숫자, 0번, 하나추가하면 1번이런식으로
  }) => (
    <View style={styles.threadContainer}>
      <View style={styles.avatarContainer}>
        <Image source={require("../assets/images/avatar.png")} style={styles.avatar} />
        <View
          style={styles.threadLine} // 세로선 쓰레드라인
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.username}>heyanna</Text>

          {/* 닫기버튼 : 두번째 게시글부터 닫기버튼 보이게 */}
          {index > 0 && (
            <TouchableOpacity
              onPress={() => removeThread(item.id)}
              style={styles.removeButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="close-outline" size={20} color="#8e8e93" />
            </TouchableOpacity>
          )}
        </View>
        {/* 일반 텍스트 입력폼 */}
        <TextInput
          style={styles.input}
          placeholder={"What's new?"}
          placeholderTextColor="#999"
          value={item.text}
          onChangeText={(text) => updateThreadText(item.id, text)}
          multiline // 여러줄 칠 수 있게 해줌, 기본은 한줄만 가능
        />
        {item.hashtag && <Text style={styles.hashtagPreview}>#{item.hashtag}</Text>}
        {/* 태그 입력 폼 및 추가 버튼 */}
        {selectedHashtagThreadId === item.id && (
          <View style={styles.hashtagContainer}>
            <TextInput
              // style={styles.input}
              style={{ flex: 1, borderBottomWidth: 1, borderColor: "#ccc" }}
              placeholder="Enter a tag"
              value={hashtagInput}
              onChangeText={setHashtagInput}
            />
            <TouchableOpacity
              onPress={() => {
                if (!isPosting && hashtagInput.trim()) {
                  insertHashtag(item.id, hashtagInput.trim());

                  const updated = threads.find((t) => t.id === item.id);
                  console.log("updated", updated);

                  setHashtagInput("");
                  setSelectedHashtagThreadId(null);
                }
              }}
              // style={{ marginLeft: 8 }}
            >
              <Text>Add</Text>
            </TouchableOpacity>
          </View>
        )}
        {/* 나중에 이미지 넣을때 필요한 FlatList */}
        {item.imageUris && item.imageUris.length > 0 && (
          <FlatList
            data={item.imageUris}
            renderItem={({ item: uri, index: imgIndex }) => (
              <View style={styles.imagePreviewContainer}>
                <Image source={{ uri }} style={styles.imagePreview} />
                <TouchableOpacity
                  onPress={() => !isPosting && removeImageFromThread(item.id, uri)}
                  style={styles.removeImageButton}
                >
                  <Ionicons name="close-circle" size={20} color="rgba(0,0,0,0.7)" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(uri, imgIndex) => `${item.id}-img-${imgIndex}-${uri}`}
            horizontal // 이미지 가로 정렬
            showsHorizontalScrollIndicator={false} // 가로 배치할대 스크롤 보이고 안보이고
            style={styles.imageFlatList}
          />
        )}

        {/* 위치 S : 위도 경도만 보여주겠다 */}
        {item.location && (
          <View style={styles.locationContainer}>
            <Text style={styles.locationText}>
              {item.location[0]}, {item.location[1]}
            </Text>
          </View>
        )}
        {/* 위치 E */}
        <View style={styles.actionButtons}>
          <Pressable style={styles.actionButton} onPress={() => !isPosting && pickImage(item.id)}>
            <Ionicons name="image-outline" size={24} color="#777" />
          </Pressable>
          <Pressable style={styles.actionButton} onPress={() => !isPosting && takePhoto(item.id)}>
            <Ionicons name="camera-outline" size={24} color="#777" />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              getMyLocation(item.id);
            }}
          >
            <FontAwesome name="map-marker" size={24} color="#777" />
          </Pressable>
          <Pressable
            style={styles.actionButton}
            onPress={() => {
              const thread = threads.find((t) => t.id === item.id);
              if (thread?.hashtag) {
                showToast("태그 한도에 도달함(1개)");
                return;
              }
              setSelectedHashtagThreadId(item.id); // 어떤 thread에 추가할건지 설정
              setHashtagInput(""); // 입력 초기화
            }}
          >
            <FontAwesome6 name="hashtag" size={24} color="#777" />
          </Pressable>
        </View>
      </View>
    </View>
  );

  useEffect(() => {
    console.log("현재 threads 상태", threads);
  }, [threads]);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={handleCancel} disabled={isPosting}>
          <Text style={[styles.cancel, isPosting && styles.disabledText]}>Cancel</Text>
        </Pressable>
        <Text style={styles.title}>New thread</Text>
        <View style={styles.headerRightPlaceholder} />
      </View>
      <FlatList
        data={threads}
        keyExtractor={(item) => item.id} // 리액트 map 사용시 key 넣어줘야 한다 - FlatList 여기서는 이것으로 고유한 값 추출해서 키로 사용하겠다
        renderItem={renderThreadItem} // 데이터들은 화면에 어떻게 보여 줄지 함수로 정의 - 아이템 자체는 여기서 꾸밈
        ListFooterComponent={
          // 리스트아이템 하단 부분 - 기타 위에 헤더 넣을 수 있는게 있다 헤더, 아이템, 푸터 삼단구조를 만들 수 있다 - 푸터는 여기서 꾸밈
          <ListFooter
            canAddThread={canAddThread}
            addThread={() => {
              // 쓰레드를 새로 추가 할 수 있을 때만
              if (canAddThread) {
                setThreads((prevThreads) => [...prevThreads, { id: Date.now().toString(), text: "", imageUris: [] }]);
              }
            }}
          />
        }
        style={styles.list} // (전체영역) FlatList 자체 꾸미는 것도 있다
        contentContainerStyle={{ backgroundColor: "#ddd" }} // 감싸는 영역 꾸미는거
        keyboardShouldPersistTaps="handled" // 마이너속성, 눌렀을때 키보드뜨고, 바깥누르면 키보드 내리고
      />
      <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
        <Pressable onPress={() => setIsDropdownVisible(true)}>
          <Text style={styles.footerText}>{replyOption} can reply & quote</Text>
        </Pressable>
        <Pressable
          style={[styles.postButton, !canPost && styles.postButtonDisabled]} // canPost 아닐때
          disabled={!canPost} // canPost 아닐때
          onPress={handlePost}
        >
          <Text style={styles.postButtonText}>Post</Text>
        </Pressable>
      </View>
      {toast && (
        <View style={[styles.toast, { top: insets.top + 12 }]}>
          <Text style={styles.toastText}>{toast}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },
  headerRightPlaceholder: {
    width: 60,
  },
  cancel: {
    color: "#000",
    fontSize: 16,
  },
  disabledText: {
    color: "#ccc",
  },
  title: {
    color: "#000",
    fontSize: 16,
    fontWeight: "600",
  },
  list: {
    flex: 1,
    backgroundColor: "#eee",
  },
  threadContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  avatarContainer: {
    alignItems: "center",
    marginRight: 12,
    paddingTop: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#555",
  },
  avatarSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#555",
  },
  threadLine: {
    width: 1.5, //웹과는 다르게 소숫점으로 표현
    flexGrow: 1,
    backgroundColor: "#aaa",
    marginTop: 8,
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 6,
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  username: {
    fontWeight: "600",
    fontSize: 15,
    color: "#000",
  },
  input: {
    fontSize: 15,
    color: "#000",
    paddingTop: 4,
    paddingBottom: 8,
    minHeight: 24,
    lineHeight: 20,
    // fontFamily: Platform.select({
    //   ios: "Apple SD Gothic Neo",
    //   android: "sans-serif",
    //   default: "System",
    // }),
  },
  actionButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginRight: 15,
  },
  imageFlatList: {
    marginTop: 12,
    marginBottom: 4,
  },
  imagePreviewContainer: {
    position: "relative",
    marginRight: 8,
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  removeImageButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 12,
    padding: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: "#8e8e93",
    fontSize: 14,
  },
  postButton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    backgroundColor: "#000",
    borderRadius: 18,
  },
  postButtonDisabled: {
    backgroundColor: "#ccc",
  },
  postButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },
  dropdownContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 10,
    overflow: "hidden",
    marginBottom: 5,
  },
  dropdownOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth, // 머리카락 굵기
    borderBottomColor: "#e5e5e5",
  },
  selectedOption: {},
  dropdownOptionText: {
    fontSize: 16,
    color: "#000",
  },
  selectedOptionText: {
    fontWeight: "600",
    color: "#007AFF",
  },
  removeButton: {
    padding: 4,
    marginRight: -4,
    marginLeft: 8,
  },
  listFooter: {
    paddingLeft: 26,
    paddingTop: 10,
    flexDirection: "row",
  },
  listFooterAvatar: {
    marginRight: 20,
    paddingTop: 2,
  },

  // 추가 S
  hashtagContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  hashtag: {
    color: "skyblue",
  },
  hashtagPreview: {
    color: "#18a3fe",
    marginTop: 4,
    fontSize: 14,
  },
  toast: {
    position: "absolute",
    top: 0,
    backgroundColor: "#e5484d",
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    zIndex: 10,
    maxWidth: "80%",
    alignSelf: "center",
    borderRadius: 16,
    elevation: 10, // 안드로이드용 그림자
    ...Platform.select({
      ios: {
        // iOS 그림자
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
    }),
  },
  toastText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  // 추가 E
  // 지도

  locationContainer: {
    marginTop: 4,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 14,
    color: "#8e8e93",
  },
});
