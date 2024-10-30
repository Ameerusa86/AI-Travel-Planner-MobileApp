import { View, Text, StyleSheet, Image, ToastAndroid } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Href, useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { CreateTripContext } from "@/context/CreateTripContext";
import { AI_PROMPT } from "@/constants/Options";
import { chatSession } from "@/configs/AIModal";
import { setDoc, doc } from "firebase/firestore";
import { auth, db } from "@/configs/FirebaseConfig";

const GenerateTrip = () => {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const user = auth.currentUser;

  const GenerateAiTrip = async () => {
    setLoading(true);
    try {
      const destination = tripData.destination || "unknown location";
      const totalDays = tripData.totalDays
        ? tripData.totalDays.toString()
        : "1";
      const totalNights = tripData.totalNights
        ? tripData.totalNights.toString()
        : "0";
      const traveler = tripData.traveler?.title || "traveler";
      const budget = tripData.budget || "standard";
      const location = tripData.name || "unknown location";

      const FINAL_PROMPT = AI_PROMPT.replace("{location}", location)
        .replace("{totalDays}", totalDays)
        .replace("{totalNight}", totalNights)
        .replace("{traveler}", traveler)
        .replace("{budget}", budget);

      console.log(FINAL_PROMPT);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResponse = JSON.parse(result.response.text());

      const docId = Date.now().toString();
      const userTripRef = doc(db, "UserTrips", docId);

      await setDoc(userTripRef, {
        userEmail: user?.email,
        tripPlan: tripResponse, // AI generated trip plan
        tripData: JSON.stringify(tripData), // User input trip data
        docId,
      });

      router.push("/mytrip" as Href);
    } catch (error) {
      console.error("Error generating trip:", error);
      ToastAndroid.show("Error generating trip", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (tripData) {
      GenerateAiTrip();
    }
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
      headerTransparent: true,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Generating your trip...</Text>
      {loading && <Text>Loading ...</Text>}
    </View>
  );
};

export default GenerateTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 75,
    backgroundColor: Colors["background-light"],
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors["primary-dark"],
    marginBottom: 20,
    fontFamily: "k2d-bold",
    textAlign: "center",
  },
  loadingGif: {
    width: 150,
    height: 150,
  },
});
