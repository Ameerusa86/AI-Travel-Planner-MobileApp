import { auth } from "@/configs/FirebaseConfig";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from "react-native";

const SignIn = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onSignIn = () => {
    if (!email || !password) {
      ToastAndroid.show("All fields are required", ToastAndroid.BOTTOM);
      return;
    }
    if (!email.includes("@")) {
      ToastAndroid.show("Invalid email address", ToastAndroid.BOTTOM);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          router.replace({ pathname: "/(tabs)/mytrip" });
        }
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          ToastAndroid.show("Invalid credentials", ToastAndroid.BOTTOM);
        }
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backIconContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle-sharp" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={styles.heading}>Let's get started</Text>
      <Text style={styles.subHeading}>Welcome Back</Text>
      <Text style={styles.subHeading}>You've been missed</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={(value) => setEmail(value)}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={(value) => setPassword(value)}
        />
      </View>

      <TouchableOpacity onPress={onSignIn} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace({ pathname: "/auth/sign-up" })}
        style={styles.createAccountButton}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.WHITE,
    alignItems: "center",
  },
  backIconContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  heading: {
    fontSize: 28,
    fontFamily: "k2d-bold",
    color: Colors.PRIMARY,
    marginBottom: 10,
    marginTop: 30,
  },
  subHeading: {
    fontSize: 20,
    fontFamily: "k2d",
    color: Colors.GRAY,
    marginTop: 5,
    textAlign: "center",
  },
  inputContainer: {
    width: "100%",
    marginTop: 30,
  },
  label: {
    fontFamily: "k2d",
    fontSize: 16,
    color: Colors.GRAY_DARK,
    marginBottom: 5,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.GRAY,
    backgroundColor: Colors.BACKGROUND,
  },
  signInButton: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 10,
    marginTop: 30,
    alignItems: "center",
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  createAccountButton: {
    width: "100%",
    padding: 15,
    backgroundColor: Colors.SECONDARY,
    borderRadius: 10,
    marginTop: 15,
    alignItems: "center",
    shadowColor: Colors.SECONDARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "k2d",
    fontSize: 16,
  },
});
