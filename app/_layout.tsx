import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { ActivityIndicator, View } from "react-native";
import { CreateTripContext } from "@/context/CreateTripContext";
import { useState } from "react";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  // Load fonts
  const [fontsLoaded] = useFonts({
    k2d: require("../assets/fonts/K2D-Regular.ttf"),
    "k2d-bold": require("../assets/fonts/K2D-Bold.ttf"),
    "k2d-medium": require("../assets/fonts/K2D-Medium.ttf"),
  });

  // Initialize state for trip data
  const [tripData, setTripData] = useState({
    name: "",
    destination: "",
    startDate: new Date(),
    endDate: new Date(),
    imageUrl: "",
    traveler: null,
    budget: null,
    coordinates: {
      lat: 0,
      lng: 0,
    },
    totalDays: 0,
    totalNights: 0,
  });

  // Render a loading screen or placeholder until fonts are loaded
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <CreateTripContext.Provider value={{ tripData, setTripData }}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Define all routes explicitly as Stack.Screen components */}
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        {/* Additional screens can be added here */}
      </Stack>
      <StatusBar style="dark" />
    </CreateTripContext.Provider>
  );
}
