import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation, useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { format } from "date-fns";

const TripDetails = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      title: "",
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  // Parse trip data from route params
  const trip = typeof params.trip === "string" ? JSON.parse(params.trip) : {};
  const tripData =
    typeof trip.tripData === "string"
      ? JSON.parse(trip.tripData)
      : trip.tripData;

  const {
    name = "Trip Destination",
    imageUrl,
    startDate,
    endDate,
    traveler,
    budget,
    daily_itinerary = {},
    flights = {},
  } = tripData;

  const formattedStartDate = startDate
    ? format(new Date(startDate), "MMM dd, yyyy")
    : "N/A";
  const formattedEndDate = endDate
    ? format(new Date(endDate), "MMM dd, yyyy")
    : "N/A";

  return (
    <ScrollView style={styles.container}>
      {/* Header Image */}
      <ImageBackground source={{ uri: imageUrl }} style={styles.headerImage}>
        <View style={styles.overlay} />
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={28} color={Colors.WHITE} />
        </TouchableOpacity>
        <View style={styles.headerTextContainer}>
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerDate}>
            {formattedStartDate} - {formattedEndDate}
          </Text>
        </View>
      </ImageBackground>

      {/* Trip Info Section */}
      <View style={styles.tripInfo}>
        <View style={styles.infoItem}>
          <Ionicons name="people" size={22} color={Colors.PRIMARY} />
          <Text style={styles.infoText}>
            {traveler?.title || "Traveler info"}
          </Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="cash" size={22} color={Colors.PRIMARY} />
          <Text style={styles.infoText}>
            Budget: {budget || "Not specified"}
          </Text>
        </View>
      </View>

      {/* Itinerary Section */}
      <View style={styles.itineraryContainer}>
        <Text style={styles.sectionTitle}>Daily Itinerary</Text>
        {Object.keys(daily_itinerary).length > 0 ? (
          Object.keys(daily_itinerary).map((dayKey, index) => (
            <View key={index} style={styles.dayContainer}>
              <Text style={styles.dayTitle}>{`Day ${index + 1}`}</Text>
              {daily_itinerary[dayKey].map((activity, i) => (
                <View key={i} style={styles.activityItem}>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                  <View style={styles.activityDetails}>
                    <Text style={styles.activityTitle}>
                      {activity.activity}
                    </Text>
                    <Text style={styles.activityText}>{activity.details}</Text>
                  </View>
                </View>
              ))}
            </View>
          ))
        ) : (
          <Text style={styles.noItineraryText}>No itinerary available.</Text>
        )}
      </View>

      {/* Places to Visit Section */}
      <View style={styles.placesContainer}>
        <Text style={styles.sectionTitle}>Places to Visit</Text>
        {trip?.tripPlan?.places_to_visit?.map((place, index) => (
          <View key={index} style={styles.placeCard}>
            <ImageBackground
              source={{ uri: place.image_url }}
              style={styles.placeImage}
            />
            <View style={styles.placeDetails}>
              <Text style={styles.placeTitle}>{place.name}</Text>
              <Text style={styles.placeDescription}>{place.details}</Text>
              <Text style={styles.placeTicketPrice}>
                Ticket: {place.ticket_pricing}
              </Text>
            </View>
          </View>
        ))}
      </View>

      {/* Flight Information */}
      {flights?.example_flight && (
        <View style={styles.flightsContainer}>
          <Text style={styles.sectionTitle}>Flight Information</Text>
          <Text style={styles.flightDetail}>
            From: {flights.example_flight.from}
          </Text>
          <Text style={styles.flightDetail}>
            To: {flights.example_flight.to}
          </Text>
          <Text style={styles.flightDetail}>
            Price: {flights.example_flight.price}
          </Text>
          <Text style={styles.flightDetail}>
            Return: {flights.example_flight.return_flight}
          </Text>
          <TouchableOpacity
            style={styles.bookingButton}
            onPress={() => Linking.openURL(flights.example_flight.booking_url)}
          >
            <Text style={styles.bookingButtonText}>Book Flight</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["background-light"],
  },
  headerImage: {
    height: 250,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  headerTextContainer: {
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    color: Colors.WHITE,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "k2d-bold",
  },
  headerDate: {
    fontSize: 16,
    color: Colors.WHITE,
    fontFamily: "k2d",
  },
  tripInfo: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: Colors.WHITE,
    marginHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 4,
    marginTop: -30,
  },
  infoItem: {
    alignItems: "center",
    flexDirection: "row",
  },
  infoText: {
    fontSize: 14,
    color: Colors["primary-dark"],
    marginLeft: 8,
    fontFamily: "k2d-medium",
  },
  itineraryContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors["primary-dark"],
    marginBottom: 15,
    fontFamily: "k2d-bold",
  },
  dayContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.GRAY,
    paddingBottom: 10,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.PRIMARY,
    marginBottom: 8,
    fontFamily: "k2d-bold",
  },
  activityItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  activityTime: {
    fontSize: 14,
    color: Colors.PRIMARY,
    width: 100,
    fontFamily: "k2d-medium",
  },
  activityDetails: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors["primary-dark"],
    fontFamily: "k2d-bold",
  },
  activityText: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "k2d",
  },
  noItineraryText: {
    fontSize: 14,
    color: Colors.GRAY,
    fontStyle: "italic",
    textAlign: "center",
    fontFamily: "k2d",
  },
  placesContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
  },
  placeCard: {
    marginBottom: 15,
  },
  placeImage: {
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeDetails: {
    paddingHorizontal: 5,
  },
  placeTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors["primary-dark"],
    fontFamily: "k2d-bold",
  },
  placeDescription: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "k2d",
  },
  placeTicketPrice: {
    fontSize: 12,
    color: Colors.PRIMARY,
    fontFamily: "k2d-medium",
  },
  flightsContainer: {
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.WHITE,
    borderRadius: 15,
    padding: 20,
  },
  flightDetail: {
    fontSize: 14,
    color: Colors["primary-dark"],
    fontFamily: "k2d",
    marginBottom: 5,
  },
  bookingButton: {
    marginTop: 15,
    paddingVertical: 8,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 8,
    alignItems: "center",
  },
  bookingButtonText: {
    color: Colors.WHITE,
    fontSize: 14,
    fontWeight: "600",
  },
});
