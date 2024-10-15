import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TripCard from "../../../Components/TripCard";
import Back from "../../../Components/back";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { BASE_URL } from "../../utils/constants";
const All = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const [trips, setTrips] = useState([]);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/get_trips`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          const currentDate = new Date();
          currentDate.setHours(0, 0, 0, 0);
          const tripDate = new Date();
          const pastTrips = data.trips.filter(
            (trip) => new Date(trip.date) < currentDate
          );

          setTrips(pastTrips);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  console.log(new Date());
  return (
    <View style={styles.page}>
      <View style={styles.btn}>
        <TouchableOpacity onPress={goBack}>
          <MaterialIcons name="keyboard-arrow-left" size={35} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Past Trips</Text>
        <Text></Text>
      </View>

      <ScrollView>
        <View style={styles.container}>
          {trips.map((trip, index) => (
            <View key={trip.id} style={index % 2 === 0 ? styles.row : null}>
              <TripCard trip={trip} />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default All;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  page: {
    backgroundColor: "white",
  },
  btn: {
    position: "absolute",
    top: 0,
    left: 5,
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 100,
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    height: 100,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
