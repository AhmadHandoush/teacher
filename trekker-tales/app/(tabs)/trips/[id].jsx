import {
  ActivityIndicator,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import BookCard from "../../../Components/bookcard";
import Back from "../../../Components/back";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TripCard from "../../../Components/TripCard";
import { BASE_URL } from "../../utils/constants";

const SingleTrip = () => {
  const [book, setBook] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [booked, setBooked] = useState(false);

  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [tripData, setTripData] = useState({});
  const defaultData = {
    name: "",
    destination: "",
    description: "",
    date: "",
    trip_image: "",
    start_time: "",
    end_time: "",
    total_seats: "",
    available_seats: "",
    fees: "",
    locations: [],
  };
  useEffect(() => {
    const fetchTrips = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/get_trip/${id}`, {
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
      }
    };
    fetchTrips();
  }, []);

  const {
    name,
    destination,
    description,
    date,
    trip_image,
    start_time,
    end_time,
    total_seats,
    available_seats,
    fees,
    locations,
  } = tripData || defaultData;
  return (
    <>
      {book && <View style={styles.overlay}></View>}
      {book && (
        <BookCard
          setBook={setBook}
          id={id}
          setMessage={setMessage}
          setBooked={setBooked}
        />
      )}

      <View style={styles.page}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#e87a00"
            style={{ position: "absolute", top: 200, left: 170 }}
          />
        ) : (
          <ScrollView style={styles.scroll}>
            <Back />

            <View style={styles.single}>
              <View style={styles.hero}>
                <ImageBackground
                  source={{
                    uri: `${BASE_URL}/${tripData.trip_image}`,
                  }}
                  style={styles.image}
                ></ImageBackground>
              </View>
              <View style={styles.second}>
                <View style={styles.important}>
                  <Text style={styles.name}>{name}</Text>
                  <Text style={styles.fee}>${parseInt(fees)}</Text>
                </View>
                <View>
                  <Text style={styles.overview}>Overview</Text>
                  <Text style={styles.description}>{description}</Text>
                </View>
                <View>
                  <View style={styles.singledata}>
                    <Text style={styles.prop}>Destination</Text>
                    <Text style={styles.destination}>{destination}</Text>
                  </View>
                  <View style={styles.singledata}>
                    <Text style={styles.prop}>Date</Text>
                    <Text>{date}</Text>
                  </View>
                  <View style={styles.singledata}>
                    <Text style={styles.prop}>Start-time</Text>
                    <Text>{start_time}</Text>
                  </View>
                  <View style={styles.singledata}>
                    <Text style={styles.prop}>End-time</Text>
                    <Text>{end_time}</Text>
                  </View>

                  <View style={styles.singledata}>
                    <Text style={styles.prop}>Available-seats</Text>
                    <Text>
                      {available_seats}/{total_seats}
                    </Text>
                  </View>
                </View>
                {locations && (
                  <View style={styles.locations}>
                    <Text style={styles.loctitle}>Places to visit </Text>
                    {locations.map((location) => (
                      <Text key={location.id} style={styles.locname}>
                        {location.name}
                      </Text>
                    ))}
                  </View>
                )}
                <Text styele={styles.hint}>
                  <Text style={styles.hintname}>Hint:</Text> You can bring some
                  chocolate with you.
                </Text>
              </View>
              {message && (
                <View style={styles.message}>
                  <Text style={styles.msgText}>
                    Your booking successfully completed
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        )}
        {booked ? (
          <Text> You already booked </Text>
        ) : (
          <View>
            {!loading && (
              <TouchableOpacity
                onPress={() => {
                  setBook(true);
                }}
                style={styles.book}
              >
                <Text style={styles.viewmap}>Book Now</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </>
  );
};

export default SingleTrip;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingBottom: 5,
    position: "relative",
    height: 1000,
  },

  scroll: {
    flex: 1,
  },
  single: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    paddingTop: 20,
    paddingBottom: 20,
  },
  hero: {
    height: 300,
    width: "100%",
    backgroundColor: "#d7d7d7",
  },
  image: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overview: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },

  viewmap: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  arrow: {
    color: "white",
    fontSize: 18,
  },
  second: {
    width: "93%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  important: {
    display: "flex",
    position: "absolute",
    top: -100,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
  },
  fee: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#E87A00",
  },
  description: {
    marginTop: 5,
  },
  singledata: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  prop: {
    fontWeight: "bold",
    fontSize: 16,
  },
  destination: {},
  locations: {
    marginTop: 20,
    marginBottom: 20,
  },
  loctitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 10,
  },
  locname: {
    marginBottom: 5,
    fontSize: 18,
  },
  hint: {
    marginTop: 30,
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  hintname: {
    fontWeight: "bold",
  },
  book: {
    marginTop: 20,
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    fontWeight: "bold",
    backgroundColor: "#E87A00",
    bottom: 0,
    position: "fixed",
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    backgroundColor: "rgba(0,0,0,0.9)",
    zIndex: 1000,
  },
  message: {
    position: "absolute",
    zIndex: 20000,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 20,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }],
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  msgText: {
    color: "green",
  },
});
