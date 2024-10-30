import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

const OptionCard = ({ option, selectedTraveler }) => {
  const isSelected = selectedTraveler?.title === option?.title;

  return (
    <View style={[styles.card, isSelected && styles.selectedCard]}>
      <Ionicons
        name={option?.icon || "person"} // Fallback icon if icon is undefined
        size={32}
        color={isSelected ? "#fff" : "#4a90e2"}
        style={styles.icon}
      />
      <View style={styles.textContainer}>
        <Text style={[styles.title, isSelected && styles.selectedTitle]}>
          {option?.title || "Unknown Title"}{" "}
          {/* Fallback if title is undefined */}
        </Text>
        <Text
          style={[styles.description, isSelected && styles.selectedDescription]}
        >
          {option?.description || "No description available"} {/* Fallback */}
        </Text>
        <Text style={[styles.people, isSelected && styles.selectedPeople]}>
          People: {option?.people || "N/A"} {/* Fallback */}
        </Text>
      </View>
      {isSelected && (
        <Ionicons
          name="checkmark-circle"
          size={24}
          color="#fff"
          style={styles.checkmark}
        />
      )}
    </View>
  );
};

export default OptionCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
    position: "relative",
  },
  selectedCard: {
    backgroundColor: "#4a90e2",
    shadowColor: "#4a90e2",
    shadowOpacity: 0.3,
    elevation: 6,
  },
  icon: {
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#4a4a4a",
    marginBottom: 2,
    fontFamily: "k2d-bold",
  },
  selectedTitle: {
    color: "#ffffff",
  },
  description: {
    fontSize: 14,
    color: "#718096",
    marginBottom: 4,
    fontFamily: "k2d",
  },
  selectedDescription: {
    color: "#e2e8f0",
  },
  people: {
    fontSize: 12,
    color: "#2d3748",
    fontFamily: "k2d",
  },
  selectedPeople: {
    color: "#cbd5e0",
  },
  checkmark: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
