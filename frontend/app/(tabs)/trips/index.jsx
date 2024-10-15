import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import TripCard from "../../../Components/TripCard";

import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Back from "../../../Components/back";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyTrip from "../../../Components/mytrip";
import { BASE_URL } from "../../utils/constants";

const Trips = () => {
  const router = useRouter();
  const [focus, setFocus] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMyTrips, setShowMyTrips] = useState(false);
  const [myTripsData, setMyTripsData] = useState(initial);
  const [myTripsLoading, setMyTripsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const initial = [
    {
      id: 14,
      trip_id: 25,
      user_id: 28,
      child_name: "Vanessa",
      created_at: "2024-05-10T09:46:56.000000Z",
      updated_at: "2024-05-10T09:46:56.000000Z",
      trip: {
        id: 25,
        name: "capture",
        destination: "destination",
        description: "1",
        trip_image: "images/1714598061.jpg",
        date: "2024-05-11",
        start_time: "07:57:57",
        end_time: "17:57:57",
        total_seats: 24,
        available_seats: 22,
        fees: "223.00",
        created_at: "2024-05-01T21:14:21.000000Z",
        updated_at: "2024-05-10T09:46:56.000000Z",
        status: "active",
      },
    },
    {
      id: 15,
      trip_id: 28,
      user_id: 28,
      child_name: "Vanessa",
      created_at: "2024-05-10T09:48:58.000000Z",
      updated_at: "2024-05-10T09:48:58.000000Z",
      trip: {
        id: 28,
        name: "Beirut",
        destination: "destination",
        description: "1",
        trip_image: "images/1714598560.jpg",
        date: "2024-05-08",
        start_time: "07:57:57",
        end_time: "17:57:57",
        total_seats: 24,
        available_seats: 23,
        fees: "223.00",
        created_at: "2024-05-01T21:22:40.000000Z",
        updated_at: "2024-05-10T09:48:58.000000Z",
        status: "active",
      },
    },
    {
      id: 16,
      trip_id: 44,
      user_id: 28,
      child_name: "Kousay",
      created_at: "2024-05-10T15:50:34.000000Z",
      updated_at: "2024-05-10T15:50:34.000000Z",
      trip: {
        id: 44,
        name: "Adventure",
        destination: "South Lebanon",
        description:
          "Visit some tourists places and get a perfect weekend with getting lunch On Rouche",
        trip_image: "images/1715335433.jpg",
        date: "2024-06-05",
        start_time: "11:57:00",
        end_time: "16:57:00",
        total_seats: 22,
        available_seats: 21,
        fees: "30.00",
        created_at: "2024-05-10T10:03:53.000000Z",
        updated_at: "2024-05-10T15:50:34.000000Z",
        status: "active",
      },
    },
  ];

  useEffect(() => {
    const fetchTrips = async () => {
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
          const date = new Date();
          date.setHours(0, 0, 0, 0);
          const upcoming = data.trips.filter(
            (trip) => new Date(trip.date) > date
          );
          setTrips(upcoming);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchTrips();
  }, []);

  useEffect(() => {
    const filtered = trips.filter((trip) =>
      trip.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredTrips(filtered);
  }, [searchQuery, trips]);

  useEffect(() => {
    if (showMyTrips) {
      setMyTripsLoading(true);

      get_mytrips()
        .then((data) => {
          const date = new Date();
          date.setHours(0, 0, 0, 0);
          const myUpcoming = data.filter(
            (trip) => new Date(trip.trip.date) > date
          );
          setMyTripsData(myUpcoming);
          setMyTripsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching My Trips data:", error);
          setMyTripsLoading(false);
        });
    }
  }, [showMyTrips]);

  const get_mytrips = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/getBookingsByUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch My Trips data");
      }
      const data = await response.json();
      setMyTripsData(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const handleFocus = () => {
    setFocus(true);
  };

  const toggleView = () => {
    setShowMyTrips(!showMyTrips);
  };

  return (
    <View style={styles.trips}>
      <Back title="Trips" />
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.button, !showMyTrips && styles.activeButton]}
          onPress={toggleView}
        >
          <Text style={[styles.buttonText, !showMyTrips && styles.color]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, showMyTrips && styles.activeButton]}
          onPress={toggleView}
        >
          <Text style={[styles.buttonText, showMyTrips && styles.color]}>
            My Trips
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.search, focus && styles.focused]}>
        <Feather name="map-pin" size={20} color="#d7d7d7" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={handleSearch}
          onFocus={handleFocus}
          value={searchQuery}
          selectionColor={"#E87A00"}
        />
        <Feather name="search" size={20} color="#d7d7d7" />
      </View>
      {loading ? (
        <ActivityIndicator animating={loading} size="medium" color="#E87A00" />
      ) : showMyTrips ? (
        myTripsLoading ? (
          <ActivityIndicator
            animating={myTripsLoading}
            size="medium"
            color="#E87A00"
          />
        ) : (
          <ScrollView style={styles.scroll}>
            <View style={styles.myTripsView}>
              {success && (
                <View
                  style={{
                    position: "absolute",
                    top: 200,
                    left: 80,
                    zIndex: 1000,
                    backgroundColor: "black",
                    borderRadius: 5,
                    padding: 10,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "green", fontWeight: "bold" }}>
                    Booking Cancelled Successfully
                  </Text>
                </View>
              )}
              <Text style={styles.mineTitle}>Upcoming Trips</Text>
              {!myTripsData && <Text> You didn't book any trip yet</Text>}
              {myTripsData && (
                <View>
                  {myTripsData.map((item, index) => (
                    <MyTrip item={item} key={index} setSuccess={setSuccess} />
                  ))}
                </View>
              )}
            </View>
          </ScrollView>
        )
      ) : (
        <ScrollView style={styles.postss}>
          <View style={styles.container}>
            {filteredTrips.map((trip, index) => (
              <View key={trip.id} style={index % 2 === 0 ? styles.row : null}>
                <TripCard
                  trip={trip}
                  onPress={() => {
                    router.push(`/trips/${trip.id}`);
                  }}
                />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Trips;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 25,
    backgroundColor: "white",
  },

  color: {
    color: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  trips: {
    paddingTop: 80,
    backgroundColor: "white",
    paddingBottom: 60,
    paddingBottom: 150,
    flex: 1,
  },
  scroll: {
    backgroundColor: "white",
    height: "100%",
  },
  search: {
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#d7d7d7",
    borderRadius: 40,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    color: "black",
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "#555",
    fontWeight: "bold",
  },
  activeButton: {
    backgroundColor: "#E87A00",
    color: "white",
  },
  myTripsView: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  mineTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
  },
});
