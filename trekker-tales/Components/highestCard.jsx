import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { BASE_URL } from "../app/utils/constants";

const HighestCard = ({ item }) => {
  return (
    <View style={styles.card}>
      <View style={styles.img}>
        <Image
          source={{ uri: `${BASE_URL}/${item.trip.trip_image}` }}
          style={styles.image}
        />
      </View>
      <View style={styles.info}>
        <View style={styles.important}>
          <Text style={styles.name}> {item.trip.name}</Text>
          <Text style={styles.fee}> ${parseInt(item.trip.fees)}</Text>
        </View>
        <View style={styles.datesec}>
          <Icon
            name="calendar"
            size={20}
            color="#808080"
            style={styles.dateicon}
          />
          <Text style={styles.date}>{item.trip.date}</Text>
        </View>
      </View>
      <View style={styles.rating}>
        <Ionicons name="star" size={16} color="gold" />
        <Text style={styles.rate}>
          {parseFloat(item.average_rating).toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default HighestCard;

const styles = StyleSheet.create({
  card: {
    margin: 10,

    backgroundColor: "#fff",
    borderRadius: 8,
    width: 170,
    elevation: 2,

    position: "relative",
  },
  img: {
    height: 120,
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  info: {
    display: "flex",
    flexDirection: "column",

    paddingLeft: 5,
    paddingRight: 5,

    marginBottom: 5,
    marginTop: 5,
  },
  important: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  rating: {
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    flexDirection: "row",
    borderRadius: 5,
    gap: 5,
    alignItems: "center",
    backgroundColor: "rgba(50, 50, 50, 0.3)",
    padding: 2,
  },
  rate: {
    color: "white",
    fontWeight: "bold",
  },
  fee: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#e87A00",
  },
  name: {
    fontWeight: "bold",
    fontSize: 14,
  },
  datesec: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingLeft: 5,
  },
  dateicon: {
    fontSize: 14,
  },
  date: {
    fontSize: 14,
  },
});
