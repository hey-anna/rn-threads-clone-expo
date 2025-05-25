import { AuthContext } from "@/app/_layout";
import SideMenu from "@/components/SideMenu";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// 기존 (tab)에 있을때와
// 폴더 [usename] 만들어 index.tsx로 변경해서 넣으면 동일한 역할해준다
// TouchableOpacity 버튼 같은거

export default function Index() {
  const insets = useSafeAreaInsets();

  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <View style={styles.header}>
        {/* activity 동일구조 S */}
        {isLoggedIn && (
          <Pressable
            style={styles.menuButton}
            onPress={() => {
              setIsSideMenuOpen(true);
            }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        )}
        <SideMenu isVisible={isSideMenuOpen} onClose={() => setIsSideMenuOpen(false)} />
        {/* activity 동일구조 E */}
      </View>
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search" value={searchQuery} onChangeText={setSearchQuery} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
  },
  menuButton: {
    position: "absolute",
    left: 20,
    top: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  searchBar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    width: "90%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
});
