import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Colors } from "@/constants/Colors";
import { Href, useNavigation, useRouter } from "expo-router";
import { CreateTripContext } from "@/context/CreateTripContext";

const budgetOptions: {
  title: string;
  description: string;
  icon: "cash-outline" | "card-outline" | "diamond-outline";
}[] = [
  {
    title: "Cheap",
    description: "Budget-friendly option",
    icon: "cash-outline",
  },
  {
    title: "Moderate",
    description: "Balanced comfort and cost",
    icon: "card-outline",
  },
  {
    title: "Luxury",
    description: "High-end experience",
    icon: "diamond-outline",
  },
];

const SelectBudget = () => {
  const { tripData, setTripData } = useContext(CreateTripContext);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Select Budget",
      headerShown: true,
      headerTransparent: true,
    });
  }, []);

  const handleSelection = (title) => {
    setSelectedBudget(title);
  };

  const handleContinue = () => {
    if (selectedBudget) {
      setTripData({ ...tripData, budget: selectedBudget });
      router.push("/create-trip/review-trip" as Href);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose Your Budget</Text>
      <Text style={styles.subText}>
        Select a budget level that fits your travel style
      </Text>

      <View style={styles.cardContainer}>
        {budgetOptions.map((option) => (
          <TouchableOpacity
            key={option.title}
            style={[
              styles.card,
              selectedBudget === option.title && styles.selectedCard,
            ]}
            onPress={() => handleSelection(option.title)}
            activeOpacity={0.8}
          >
            <Ionicons
              name={option.icon}
              size={32}
              color={
                selectedBudget === option.title
                  ? Colors.WHITE
                  : Colors["primary-dark"]
              }
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  selectedBudget === option.title && styles.selectedTitle,
                ]}
              >
                {option.title}
              </Text>
              <Text
                style={[
                  styles.description,
                  selectedBudget === option.title && styles.selectedDescription,
                ]}
              >
                {option.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.continueButton,
          selectedBudget && styles.continueButtonActive,
        ]}
        onPress={handleContinue}
        disabled={!selectedBudget}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
        <Ionicons name="arrow-forward-circle" size={24} color={Colors.WHITE} />
      </TouchableOpacity>
    </View>
  );
};

export default SelectBudget;

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
    marginBottom: 5,
    fontFamily: "k2d-bold",
  },
  subText: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: "center",
    marginBottom: 20,
    fontFamily: "k2d",
  },
  cardContainer: {
    flexDirection: "column",
    gap: 10,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: Colors.PRIMARY,
    shadowColor: Colors.PRIMARY,
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
    color: Colors["primary-dark"],
    fontFamily: "k2d-bold",
  },
  selectedTitle: {
    color: Colors.WHITE,
  },
  description: {
    fontSize: 14,
    color: Colors.GRAY,
    fontFamily: "k2d",
  },
  selectedDescription: {
    color: Colors["background-light"],
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.GRAY_LIGHT,
    paddingVertical: 15,
    borderRadius: 30,
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
