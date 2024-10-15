import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Notifications from "expo-notifications";

import { Link } from "expo-router";
import { BASE_URL } from "../app/utils/constants";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyTrip = ({ item, setSuccess }) => {
  const currentDate = new Date();
  const tripDate = new Date(item.trip.date);
  const [current, setCurrent] = useState(false);
  const [setting, setSetting] = useState(false);
  const [tripStartTime, setTripStartTime] = useState(item.trip.start_time);
  const [notificationScheduled, setNotificationScheduled] = useState(false);

  useEffect(() => {
    setTripStartTime(item.trip.start_time);

    if (!notificationScheduled) {
      const timeUntilTripStart = calculateTimeUntilTripStart(tripStartTime);
      if (timeUntilTripStart > 0) {
        setTimeout(scheduleTripNotification, timeUntilTripStart);
      }
      setNotificationScheduled(true);
    }
  }, [tripStartTime, notificationScheduled]);

  const calculateTimeUntilTripStart = (startTime) => {
    const currentTime = new Date().getTime();
    const tripStartTime = new Date(startTime).getTime();
    return tripStartTime - currentTime;
  };

  const scheduleTripNotification = async () => {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Trip Reminder",
          body: "Your trip is about to begin!",
        },
        trigger: { seconds: 1 },
      });

      console.log("Trip notification scheduled successfully.");
    } catch (error) {
      console.error("Error scheduling trip notification:", error);
    }
  };

  useEffect(() => {
    if (tripDate.toDateString() === currentDate.toDateString()) {
      setCurrent(true);
    }
  }, []);
  const handleSetting = () => {
    setSetting((setting) => !setting);
  };

  // cancel booking
  const handleCancel = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(
        `${BASE_URL}/api/delete_booking/${item.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
      } else {
        Alert.alert("Error", "Failed to cancelled booking");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to send data");
    }
  };

  return (
    <View style={styles.mine}>
      <TouchableOpacity
        style={{
          display: "flex",
          alignItems: "flex-end",
          position: "absolute",
          top: 10,
          right: 10,
        }}
        onPress={handleSetting}
      >
        <Entypo name="dots-three-vertical" size={16} color="black" />
      </TouchableOpacity>

      {setting && (
        <TouchableOpacity
          style={{
            position: "absolute",
            right: 10,
            top: 40,
            backgroundColor: "#808080",
            padding: 3,
            borderRadius: 5,
          }}
          onPress={handleCancel}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>
            Cancel Booking
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.mineimg}>
        <Image
          style={styles.mineimage}
          source={{ uri: `${BASE_URL}/${item.trip.trip_image}` }}
        />
      </View>
      <View style={styles.mineinfo}>
        <Text style={styles.mineName}>{item.trip.name}</Text>
        <Text style={styles.mineDate}>
          <Icon
            name="calendar"
            size={12}
            color="#808080"
            style={styles.dateicon}
          />{" "}
          {item.trip.date}
        </Text>
        {current && (
          <View
            style={{
              textAlign: "right",
              width: "100%",
              fontWeight: "bold",
              display: "flex",
              flexDirection: "row",
              gap: 10,
            }}
          >
            <Text>Active Now</Text>
            <Link href="/map" style={{ color: "#e87a00", fontWeight: "bold" }}>
              Go Live
            </Link>
          </View>
        )}
      </View>
    </View>
  );
};

export default MyTrip;

const styles = StyleSheet.create({
  mine: {
    width: "100%",
    height: 100,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginLeft: "auto",
    marginRight: "auto",
    elevation: 2,
    backgroundColor: "white",

    marginBottom: 10,
    borderRadius: 8,
    overflow: "hidden",
  },
  mineimg: {
    height: "100%",
    width: "40%",
    overflow: "hidden",
  },
  mineimage: {
    width: "100%",
    height: "100%",
  },
  mineName: {
    fontWeight: "bold",
    fontSize: 18,
    color: "#e87a00",
  },
  mineinfo: {
    display: "flex",
    justifyContent: "space-around",
  },
});
