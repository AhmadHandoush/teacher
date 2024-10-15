import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { db } from "../../firebase";

const LocationScreen = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          setLoading(false);
          return;
        }

        console.log("Location permission granted");

        const locationListener = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 10 },
          async (newLocation) => {
            console.log("New location:", newLocation);
            const { latitude, longitude } = newLocation.coords;
            setLocation({ latitude, longitude });
            try {
              const locationsCollectionRef = collection(db, "locations");
              await addDoc(locationsCollectionRef, {
                latitude,
                longitude,
                timestamp: serverTimestamp(),
              });
              console.log("Location updated successfully!");
            } catch (error) {
              setError("Error updating location: " + error.message);
            }
          }
        );

        setLoading(false);

        return () => {
          if (locationListener) {
            locationListener.remove();
          }
        };
      } catch (error) {
        setError("Error getting location: " + error.message);
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#e87a00" />
        <Text style={styles.text}>Getting your location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={location}
            title="Your Location"
            description="This is where you are"
          />
        </MapView>
      ) : (
        <Text style={styles.text}>Location not available</Text>
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
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 20,
    textAlign: "center",
    color: "red",
    marginTop: 20,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default LocationScreen;
