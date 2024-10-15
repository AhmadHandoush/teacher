import {
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL } from "../app/utils/constants";

const TakenTrip = ({ trip, setAddReview, setTripId }) => {
  const { name, fees, date, trip_image, id } = trip.trip;
  const handleOpenReview = () => {
    setAddReview(true);
    setTripId(id);
  };
  return (
    <TouchableOpacity onPress={handleOpenReview}>
      <View style={styles.card}>
        <View style={styles.image}>
          <Image
            source={{ uri: `${BASE_URL}/${trip_image}` }}
            style={styles.img}
          />
        </View>
        <View style={styles.data}>
          <View style={styles.topline}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.rate}>
              <MaterialIcons name="star" size={16} color="gold" />
              <Text style={styles.rating}>{2.2}</Text>
            </View>
          </View>
          <View style={styles.bottomline}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.fees}>${parseInt(fees)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TakenTrip;

const styles = StyleSheet.create({
  card: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  data: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flex: 1,
    gap: 15,
  },

  image: {
    width: 100,
    height: 100,
    overflow: "hidden",
    backgroundColor: "white",
    borderRadius: 10,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  topline: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomline: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  rating: {
    fontWeight: "bold",
  },
  fees: {
    fontWeight: "bold",
    fontSize: 20,
  },
  date: {
    fontWeight: "bold",
  },
});
