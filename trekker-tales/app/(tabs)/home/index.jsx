import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../utils/constants";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [focus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [ok, setOK] = useState("");

  const handleFocus = () => {
    setFocus(true);
  };

  const [top, setTop] = useState([]);
  const [filteredTop, setFilteredTop] = useState([]);

  const [trips, setTrips] = useState([]);
  const [filteredTrips, setFilteredTrips] = useState([]);

  const [hamada, setHamada] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/user`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();
          setOK("ahamd");

          setUser(data.user);
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

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token !== null) {
          console.log("Token found:", token);
        } else {
          navigation.navigate("../../login.jsx");
        }
      } catch (error) {
        console.error("Error checking token:", error);
      }
    };

    checkToken();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/get_highest_rated`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setTop(data);
          setFilteredTop(data);
          setLoading(false);
          setHamada("hell owe are here ");
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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

          setTrips(data.trips);
          setFilteredTrips(data.trips);
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

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Filter top trips based on search query
    const filteredTopData = top.filter((item) =>
      item.trip.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTop(filteredTopData);

    const filteredTripsData = trips.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredTrips(filteredTripsData);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `${BASE_URL}/${item.trip.trip_image}` }}
        style={styles.image}
      />
      <Text style={styles.name}>{item.trip.name}</Text>
      <Text style={styles.destination}>{item.trip.destination}</Text>
    </View>
  );

  const pastItem = ({ item }) => (
    <View style={styles.pastcard}>
      <Image
        source={{ uri: `${BASE_URL}/${item.trip_image}` }}
        style={styles.pastimage}
      />
      <Text style={styles.pastname}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.home}>
      <View style={styles.top}>
        <Text style={styles.hi}>Hi, {user && user.name}</Text>
        <View style={[styles.search, focus && styles.focused]}>
          <Feather name="map-pin" size={20} color="#E7E7E7" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            onChangeText={handleSearch}
            onFocus={handleFocus}
            value={searchQuery}
            selectionColor={"#E87A00"}
            placeholderTextColor="#333"
          />
          <Feather name="search" size={20} color="#E7E7E7" />
        </View>
      </View>

      <View style={styles.hero}>
        <ImageBackground
          source={require("../../../assets/hero.webp")}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 20,
            maxHeight: "100%",
            maxWidth: "100%",
            display: "flex",
          }}
        >
          <Text style={styles.heroText}>
            We are here to help you find the best trip for your children
          </Text>
        </ImageBackground>
      </View>
      {/* top trips */}

      <View style={styles.toptrips}>
        <View style={styles.topone}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Top Trips</Text>
          <Link href="/(tabs)/home/highest" style={{ color: "#e87a00" }}>
            See all
          </Link>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#e87a00" />
        ) : (
          <FlatList
            data={filteredTop.slice(0, 2)}
            renderItem={renderItem}
            numColumns={2}
          />
        )}
      </View>

      {/* .past trips  */}
      <View style={styles.pasttrips}>
        <View style={styles.topone}>
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Past Trips</Text>

          <Link href="/(tabs)/home/all" style={{ color: "#e87a00" }}>
            See all
          </Link>
        </View>
      </View>
      <View>
        <FlatList
          data={filteredTrips.slice(0, 7)}
          renderItem={pastItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  home: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  top: {
    height: 180,
    width: "100%",
    backgroundColor: "#E87A00",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  hi: {
    marginTop: 50,
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 20,
  },
  search: {
    display: "flex",
    flexDirection: "row",
    marginTop: 30,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    borderRadius: 40,
    padding: 5,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
  },
  searchInput: {
    flex: 1,
  },
  focused: {
    borderColor: "blue",
  },
  hero: {
    width: "95%",
    height: 200,
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 20,
    borderRadius: 20,
    overflow: "hidden",

    backgroundColor: "red",
  },
  heroText: {
    color: "white",
    marginLeft: 10,
    marginTop: 120,
    fontWeight: "bold",
    fontSize: 20,
  },
  toptrips: {
    width: "93%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 15,
  },

  topone: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    width: "45%",
    margin: 10,
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#fff",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    gap: 5,
    height: 150,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 100,
    resizeMode: "cover",
    marginBottom: 5,
  },
  name: {
    paddingLeft: 8,
    marginTop: -10,
    fontWeight: "bold",
    fontSize: 18,
  },
  destination: {
    paddingLeft: 8,
    marginTop: -5,
  },
  pasttrips: {
    width: "93%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 26,
  },
  pastcard: {
    alignItems: "center",
    margin: 10,
  },
  pastimage: {
    width: 60,
    height: 60,
    borderRadius: 40,
    marginBottom: 5,
  },
  pastname: {
    textAlign: "center",
  },
});
