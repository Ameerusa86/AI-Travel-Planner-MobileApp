import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns"; // Import date-fns for date formatting
import { useRouter } from "expo-router"; // Import useRouter for navigation

const UserTripCard = ({ trip }) => {
  const router = useRouter();

  // Parse tripData if it's stored as a JSON string
  const tripData =
    typeof trip.tripData === "string"
      ? JSON.parse(trip.tripData)
      : trip.tripData;

  const location = tripData?.name || "Unknown Location";
  const startDate = tripData?.startDate ? new Date(tripData.startDate) : null;
  const endDate = tripData?.endDate ? new Date(tripData.endDate) : null;

  // Format dates if they exist
  const formattedStartDate = startDate
    ? format(startDate, "MMM dd, yyyy")
    : "Not specified";
  const formattedEndDate = endDate
    ? format(endDate, "MMM dd, yyyy")
    : "Not specified";

  const imageUrl = tripData?.imageUrl || "https://via.placeholder.com/400";
  const travelerInfo =
    tripData?.traveler?.title || "Traveler info not available";
  const budget = tripData?.budget || "Not specified";

  const handlePress = () => {
    // Navigate to trip details page, passing the trip data as a parameter
    router.push({
      pathname: "/trip-details",
      params: { trip: JSON.stringify(trip) },
    });
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.locationText}>{location}</Text>
        <Text style={styles.dateText}>
          {formattedStartDate} - {formattedEndDate}
        </Text>
        <View style={styles.detailsContainer}>
          <Ionicons name="people" size={18} color={Colors.PRIMARY} />
          <Text style={styles.detailsText}>{travelerInfo}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Ionicons name="cash" size={18} color={Colors.PRIMARY} />
          <Text style={styles.detailsText}>Budget: {budget}</Text>
        </View>

        {/* View Details Button */}
        <TouchableOpacity style={styles.detailsButton} onPress={handlePress}>
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default UserTripCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: 180,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 15,
  },
  locationText: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors["primary-dark"],
    marginBottom: 8,
  },
  dateText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginBottom: 8,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  detailsText: {
    fontSize: 14,
    color: Colors.GRAY,
    marginLeft: 8,
  },
  detailsButton: {
    marginTop: 15,
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    alignItems: "center",
  },
  detailsButtonText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: "600",
  },
});
