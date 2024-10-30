import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { Href, useNavigation, useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import CalendarPicker from "react-native-calendar-picker";
import Ionicons from "@expo/vector-icons/Ionicons";

const SelectDates = () => {
  const navigation = useNavigation();
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Select Dates",
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  const onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    }
  };

  const handleContinue = () => {
    if (!selectedStartDate || !selectedEndDate) {
      Alert.alert(
        "Incomplete Selection",
        "Please select both start and end dates."
      );
    } else {
      router.push("/create-trip/select-budget" as Href);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select Your Travel Dates</Text>
      <Text style={styles.subText}>
        Choose a start and end date for your trip.
      </Text>

      <CalendarPicker
        onDateChange={onDateChange}
        allowRangeSelection={true}
        selectedDayColor={Colors.PRIMARY}
        selectedDayTextColor={Colors.WHITE}
        todayBackgroundColor={Colors["gray-light"]}
        minDate={new Date()}
        textStyle={styles.calendarText}
      />

      {selectedStartDate && selectedEndDate && (
        <View style={styles.selectedDatesContainer}>
          <Text style={styles.dateText}>
            Start:{" "}
            {selectedStartDate ? selectedStartDate.toString().slice(4, 15) : ""}
          </Text>
          <Text style={styles.dateText}>
            End:{" "}
            {selectedEndDate ? selectedEndDate.toString().slice(4, 15) : ""}
          </Text>
          <Text style={styles.daysText}>
            Total days:{" "}
            {Math.ceil(
              (selectedEndDate - selectedStartDate) / (1000 * 60 * 60 * 24) + 1
            )}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedStartDate && selectedEndDate && styles.continueButtonActive,
        ]}
        onPress={handleContinue}
        disabled={!selectedStartDate || !selectedEndDate}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
        <Ionicons name="arrow-forward-circle" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default SelectDates;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingTop: 80,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors["primary-dark"],
    textAlign: "center",
    marginBottom: 8,
    fontFamily: "k2d-bold",
  },
  subText: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "k2d",
  },
  calendarText: {
    fontFamily: "k2d",
    color: Colors["gray-dark"],
  },
  selectedDatesContainer: {
    backgroundColor: Colors["background-light"],
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateText: {
    fontSize: 16,
    color: Colors["primary-dark"],
    fontFamily: "k2d-medium",
    marginVertical: 2,
  },
  daysText: {
    fontSize: 14,
    color: Colors["gray-dark"],
    fontFamily: "k2d",
    marginTop: 8,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.GRAY_LIGHT,
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 20,
    marginTop: 30,
  },
  continueButtonActive: {
    backgroundColor: Colors.PRIMARY,
  },
  continueButtonText: {
    color: Colors.WHITE,
    fontSize: 18,
    fontFamily: "k2d-bold",
    marginRight: 8,
  },
});
