import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import { useRouter } from "expo-router";
import { BASE_URL } from "../app/utils/constants";
const TripCard = ({ trip, onPress }) => {
  const router = useRouter();


  return (
    <TouchableOpacity onPress={onPress} style={styles.more}>
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/${trip.trip_image}` }}
          style={styles.image}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{trip.name}</Text>
          <Text style={styles.fee}>${parseInt(trip.fees)}</Text>
        </View>
        <View style={styles.datefill}>
          <Icon
            name="calendar"
            size={20}
            color="#808080"
            style={styles.dateicon}
          />
          <Text style={styles.date}>{trip.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TripCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: 8,
    width: 170,
    elevation: 2,
  },
  datefill: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    margin: 5,
    alignItems: "center",
  },
  dateicon: {
    fontSize: 13,
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 10,
  },

  name: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 16,
  },
  fee: {
    paddingLeft: 5,
    fontWeight: "bold",
    fontSize: 16,
    color: "#E87A00",
  },
  info: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingRight: 5,
    alignItems: "center",
  },

  date: {
    color: "black",
    marginLeft: 5,

    fontSize: 13,
  },
});
