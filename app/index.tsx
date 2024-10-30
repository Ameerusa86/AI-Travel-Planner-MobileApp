import Login from "@/components/Login";
import { auth } from "@/configs/FirebaseConfig";
import { Redirect, useRouter } from "expo-router";
import { Text, View } from "react-native";
import "react-native-get-random-values";
import { registerRootComponent } from "expo";

registerRootComponent(Index);

export default function Index() {
  const user = auth.currentUser;
  const router = useRouter();

  return (
    <View style={{ flex: 1 }}>
      {user ? (
        (router.replace({ pathname: "/(tabs)/mytrip" }), null)
      ) : (
        <Login />
      )}
    </View>
  );
}
