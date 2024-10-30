import { Colors } from "@/constants/Colors";
import { router, useNavigation } from "expo-router";
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
import Ionicons from "@expo/vector-icons/Ionicons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/configs/FirebaseConfig";

const SignUp = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = () => {
    if (!email || !password || !fullName) {
      ToastAndroid.show("All fields are required", ToastAndroid.BOTTOM);
      return;
    }
    if (password.length < 6) {
      ToastAndroid.show(
        "Password must be at least 6 characters",
        ToastAndroid.BOTTOM
      );
      return;
    }
    if (!email.includes("@")) {
      ToastAndroid.show("Invalid email address", ToastAndroid.BOTTOM);
      return;
    }
    if (!email && !password && !fullName) {
      ToastAndroid.show("Please enter all informations", ToastAndroid.TOP);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.replace({ pathname: "/(tabs)/mytrip" });
        ToastAndroid.show("Account created successfully!", ToastAndroid.BOTTOM);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          ToastAndroid.show("Email already exists", ToastAndroid.BOTTOM);
        } else {
          ToastAndroid.show(
            "An error occurred. Please try again.",
            ToastAndroid.BOTTOM
          );
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
      <Text style={styles.heading}>Create Your Account</Text>
      <Text style={styles.subHeading}>Join Us Today!</Text>
      <Text style={styles.subHeading}>Discover new possibilities</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(value) => setFullName(value)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          onChangeText={(value) => setEmail(value)}
          style={styles.input}
          placeholder="Enter your email"
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

      <TouchableOpacity onPress={onCreateAccount} style={styles.signUpButton}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.replace({ pathname: "/auth/sign-in" })}
        style={styles.signInButton}
      >
        <Text style={styles.buttonText}>Already have an account? Sign In</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SignUp;

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
    marginBottom: 8,
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
    marginTop: 20,
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
  signUpButton: {
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
  signInButton: {
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
