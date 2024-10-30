import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.mainContainer}>
      <Image
        source={require("../assets/images/3d-travel-icon-with-airplane.jpg")}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.title}>AI Travel Planner</Text>
        <Text style={styles.subtitle}>
          Discover the best travel destinations with the help of our AI travel
          planner.
        </Text>
        <TouchableOpacity
          onPress={() => router.push("auth/sign-in")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
  },
  image: {
    width: "100%",
    height: 520,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  container: {
    backgroundColor: Colors.WHITE,
    marginTop: -30,
    flex: 1,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontFamily: "k2d-bold",
    textAlign: "center",
    marginTop: 20,
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontFamily: "k2d",
    fontSize: 18,
    textAlign: "center",
    color: Colors.GRAY,
    marginTop: 15,
    lineHeight: 24,
  },
  button: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 25,
    marginTop: 40,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "k2d",
    fontSize: 18,
  },
});
