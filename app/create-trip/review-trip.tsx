import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { Href, router, useNavigation } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { CreateTripContext } from "@/context/CreateTripContext";

const ReviewTrip = () => {
  const navigation = useNavigation();
  const { tripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Review Trip",
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.headerText}>Review Your Trip Details</Text>

      {/* Destination Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Destination</Text>
        <Text style={styles.sectionContent}>
          {tripData.name || "Not selected"}
        </Text>
        {tripData.imageUrl && (
          <Image
            source={{ uri: tripData.imageUrl }}
            style={styles.destinationImage}
          />
        )}
      </View>

      {/* Dates Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Travel Dates</Text>
        <Text style={styles.sectionContent}>
          {tripData.startDate
            ? new Date(tripData.startDate).toDateString()
            : "Not selected"}{" "}
          -{" "}
          {tripData.endDate
            ? new Date(tripData.endDate).toDateString()
            : "Not selected"}
        </Text>
        {tripData.totalDays > 0 && (
          <Text style={styles.sectionContent}>
            Total: {tripData.totalDays} day
            {tripData.totalDays > 1 ? "s" : ""} and {tripData.totalNights} night
            {tripData.totalNights > 1 ? "s" : ""}
          </Text>
        )}
      </View>

      {/* Traveler Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Traveler</Text>
        <Text style={styles.sectionContent}>
          {tripData.traveler ? tripData.traveler.title : "Not selected"}
        </Text>
      </View>

      {/* Budget Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Budget</Text>
        <Text style={styles.sectionContent}>
          {tripData.budget || "Not selected"}
        </Text>
      </View>

      {/* Confirm Trip Button */}
      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => router.push("/create-trip/generate-trip" as Href)}
      >
        <Text style={styles.confirmButtonText}>Confirm Trip</Text>
        <Ionicons name="checkmark-circle" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReviewTrip;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors["background-light"],
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 50,
    marginTop: 55,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "k2d-bold",
  },
  section: {
    width: "100%",
    padding: 20,
    marginBottom: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors["primary-dark"],
    marginBottom: 8,
    fontFamily: "k2d-medium",
  },
  sectionContent: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "k2d",
    lineHeight: 20,
  },
  destinationImage: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginTop: 10,
  },
  confirmButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 8,
  },
  confirmButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "k2d-bold",
    marginRight: 8,
  },
});
