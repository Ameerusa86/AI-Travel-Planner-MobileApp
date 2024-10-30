import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Href, useRouter } from "expo-router";

const StartNewTripCard = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Ionicons
        name="location-outline"
        size={50}
        color={Colors.PRIMARY}
        style={styles.icon}
      />
      <Text style={styles.titleText}>No Trip Planned</Text>
      <Text style={styles.subtitleText}>
        Ready for a new adventure? Tap the + icon above to start planning your
        next trip!
      </Text>
      <TouchableOpacity
        onPress={() => router.push("/create-trip/search-place" as Href)}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start a New Trip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default StartNewTripCard;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center" as const, // Specify as const for type compatibility
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginTop: 50,
    backgroundColor: Colors.WHITE,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  icon: {
    marginBottom: 20,
  },
  titleText: {
    fontFamily: "k2d-bold",
    fontSize: 26,
    color: Colors.GRAY_DARK,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitleText: {
    fontFamily: "k2d",
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: "center",
    lineHeight: 24,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 30,
    shadowColor: Colors.PRIMARY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    fontFamily: "k2d-bold",
    fontSize: 18,
  },
});
