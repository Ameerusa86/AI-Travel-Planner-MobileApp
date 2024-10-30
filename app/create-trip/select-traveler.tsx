import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Href, useNavigation, useRouter } from "expo-router";
import { selectTravelerList } from "@/constants/Options";
import OptionCard from "@/components/CreateTrip/OptionCard";
import { CreateTripContext } from "@/context/CreateTripContext";

const SelectTraveler = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [selectedTraveler, setSelectedTraveler] = useState(null);
  const { tripData, setTripData } = useContext(CreateTripContext);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: "Select Traveler",
    });
  }, []);

  useEffect(() => {
    if (selectedTraveler) {
      setTripData({
        ...tripData,
        traveler: selectedTraveler,
      });
    }
  }, [selectedTraveler]);

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Who's traveling with you?</Text>
      <Text style={styles.subtitle}>Select your travel companions</Text>

      <FlatList
        data={selectTravelerList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelectedTraveler(item)}
            activeOpacity={0.7}
          >
            <OptionCard option={item} selectedTraveler={selectedTraveler} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedTraveler && styles.continueButtonActive,
        ]}
        onPress={() => {
          if (selectedTraveler) {
            router.push("/create-trip/select-date" as Href);
          }
        }}
        disabled={!selectedTraveler}
        activeOpacity={selectedTraveler ? 0.8 : 1} // Reduce opacity on press when enabled
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelectTraveler;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 70,
    backgroundColor: "#f9fafb",
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
    fontFamily: "k2d-bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "k2d",
  },
  listContainer: {
    paddingBottom: 20,
  },
  continueButton: {
    backgroundColor: "#b0b0b0",
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.6, // Slightly transparent when disabled
  },
  continueButtonActive: {
    backgroundColor: "#4a90e2", // Primary color when active
    opacity: 1, // Full opacity when enabled
    shadowColor: "#4a90e2",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Shadow for Android
  },
  continueButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
    fontFamily: "k2d-bold",
  },
});
