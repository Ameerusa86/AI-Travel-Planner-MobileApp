import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useEffect } from "react";
import { Href, useNavigation, useRouter } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { CreateTripContext } from "@/context/CreateTripContext";

const SearchPlace = () => {
  const navigation = useNavigation();
  const { tripData, setTripData } = useContext(CreateTripContext);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Search Destination",
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Where would you like to go?</Text>
      <GooglePlacesAutocomplete
        placeholder="Search for a destination"
        fetchDetails={true}
        onPress={(data, details = null) => {
          if (details) {
            const photoRef = (details as any).photos?.[0]?.photo_reference;
            const imageUrl = photoRef
              ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
              : null;

            setTripData({
              ...tripData,
              name: data.description,
              coordinates: details.geometry.location,
              imageUrl: imageUrl,
            });
          }
          router.push("/create-trip/select-traveler" as Href);
        }}
        query={{
          key: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
          language: "en",
        }}
        styles={{
          textInputContainer: styles.searchContainer,
          textInput: styles.searchInput,
          listView: styles.listView,
          description: styles.description,
          row: styles.row,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
    marginTop: 75,
    height: "100%",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "k2d",
  },
  searchContainer: {
    borderRadius: 15,
    paddingVertical: 0,
    backgroundColor: "#fff",
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    fontSize: 16,
    color: "#333",
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 20,
    fontFamily: "k2d",
  },
  listView: {
    backgroundColor: "transparent",
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: "#666",
  },
  row: {
    backgroundColor: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 5,
    borderRadius: 12,
    shadowColor: "#333",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default SearchPlace;
