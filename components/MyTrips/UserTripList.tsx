import { FlatList, StyleSheet } from "react-native";
import React from "react";
import UserTripCard from "@/components/MyTrips/UserTripCard";
import { useRouter } from "expo-router";

const UserTripList = ({ userTrips }) => {
  const router = useRouter();
  const renderTripItem = ({ item }) => {
    return <UserTripCard trip={item} />;
  };

  return (
    <FlatList
      data={userTrips}
      renderItem={renderTripItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.container}
    />
  );
};

export default UserTripList;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
});
