import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import StartNewTripCard from "@/components/MyTrips/StartNewTripCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "@/configs/FirebaseConfig";
import UserTripList from "@/components/MyTrips/UserTripList";

const MyTrip = () => {
  const [userTrips, setUserTrips] = useState([]);
  const user = auth.currentUser.email;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    user && GetMyTrip();
  }, [user]);

  const GetMyTrip = async () => {
    setLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, "UserTrips"),
      where("userEmail", "==", user)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserTrips((prevTrips) => [...prevTrips, doc.data()]);
    });
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>My Trips</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add-circle" size={30} color={Colors.PRIMARY} />
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.PRIMARY}
          style={styles.loadingIndicator}
        />
      )}

      {/* Content Section */}
      <View style={styles.contentContainer}>
        {userTrips.length === 0 ? (
          <StartNewTripCard />
        ) : (
          <UserTripList userTrips={userTrips} />
        )}
      </View>
    </View>
  );
};

export default MyTrip;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors["background-light"],
    paddingTop: 55,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  headerText: {
    fontFamily: "k2d-bold",
    fontSize: 28,
    color: Colors["primary-dark"],
  },
  addButton: {
    borderRadius: 50,
    padding: 5,
  },
  loadingIndicator: {
    marginVertical: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
});
