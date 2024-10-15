import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import Back from "../Components/back";
import { BASE_URL, ai_key } from "./utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Audio } from "expo-av";

const OtherUserLocationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [tripData, setTripData] = useState({});

  const locations = [
    {
      id: 1,
      coordinate: {
        latitude: 34.3736218,
        longitude: 35.7783809,
      },
      title: "Deddeh",
    },
    {
      id: 2,
      coordinate: {
        latitude: 34.3583744,
        longitude: 35.7302337,
      },
      title: "Anfeh",
    },
  ];

  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/get_trip/46`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setTripData(data);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch trip data");
        setLoading(false);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "locations"),
      (snapshot) => {
        const locations = [];
        snapshot.forEach((doc) => {
          const { latitude, longitude } = doc.data();
          locations.push({
            id: doc.id,
            coordinate: {
              latitude,
              longitude,
            },
          });
        });
        setUserLocations(locations);
        setLoading(false);
      },
      (error) => {
        setError("Error fetching user locations: " + error.message);
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const haversineDistance = (coords1, coords2) => {
    const toRad = (x) => (x * Math.PI) / 180;
    const R = 6371; // Earth radius in km

    const dLat = toRad(coords2.latitude - coords1.latitude);
    const dLon = toRad(coords2.longitude - coords1.longitude);
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchAndPlayTTS = async (text) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: text,
          max_tokens: 50,
          n: 1,
          stop: null,
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${ai_key}`,
            "Content-Type": "application/json",
          },
        }
      );

      const soundObject = new Audio.Sound();
      await soundObject.loadAsync({ uri: response.data.audio_url });
      await soundObject.playAsync();
    } catch (error) {
      console.error("Error fetching TTS:", error);
    }
  };

  const checkProximity = () => {
    userLocations.forEach((userLocation) => {
      locations.forEach((location) => {
        const distance = haversineDistance(
          userLocation.coordinate,
          location.coordinate
        );
        if (distance < 1) {
          fetchAndPlayTTS(`User is within 1 kilometer of ${location.title}`);
        }
      });
    });
  };

  useEffect(() => {
    if (!loading && userLocations.length > 0) {
      checkProximity();
    }
  }, [userLocations]);

  return (
    <View style={styles.container}>
      <Back />
      {loading ? (
        <ActivityIndicator size="large" color="#e87a00" />
      ) : userLocations.length > 0 ? (
        <MapView style={styles.map}>
          {locations.map((location) => (
            <React.Fragment key={location.id}>
              <Marker coordinate={location.coordinate} title={location.title} />

              <Circle
                center={location.coordinate}
                radius={1000}
                strokeColor="rgba(255,0,0,0.5)"
                fillColor="rgba(255,0,0,0.2)"
              />
            </React.Fragment>
          ))}

          {userLocations.map((location) => (
            <Marker
              key={location.id}
              coordinate={location.coordinate}
              title={`Location ${location.id}`}
            />
          ))}
        </MapView>
      ) : (
        <Text>{error || "No user locations available"}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default OtherUserLocationScreen;
