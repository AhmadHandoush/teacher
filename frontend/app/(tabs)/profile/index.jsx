import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import TakenTrip from "../../../Components/takenTrip";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../utils/constants";
import { FontAwesome } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import EditProfile from "../../../Components/editbox";
import AddReview from "../../../Components/addReview";
import Back from "../../../Components/back";

const Profile = () => {
  const [user, setUser] = useState();
  const [ratingsuccess, setRatingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const [myTripsData, setMyTripsData] = useState(initial);
  const [mytakenTrips, setMytakenTrips] = useState([]);
  const [addreview, setAddReview] = useState(false);
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
  const [tripid, setTripId] = useState(0);

  const defaultUser = {
    name: "",
    email: "",
    phone: "",
    address: "",
    user_image: "",
  };
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
    get_mytrips()
      .then((data) => {
        const date = new Date();
        date.setHours(0, 0, 0, 0);
        const filtered = data.filter((trip) => new Date(trip.trip.date) < date);
        setMyTripsData(filtered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching My Trips data:", error);
        setLoading(true);
      });
  }, []);
  const updateProfileImage = (newImageUri) => {
    setUser((prevUser) => ({
      ...prevUser,
      user_image: newImageUri,
    }));
  };

  const { name, email, phone, address, user_image } = user || defaultUser;

  const handleLogout = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      await AsyncStorage.clear();
      router.replace("../../login");
    } catch (error) {
      console.error("Error clearing local storage:", error);
    }
  };
  const handleEdit = () => {
    setEdit(true);
  };
  const add_review = () => {};
  return (
    <>
      <Back title={"Profile"} />
      {edit && <View style={styles.overlay}></View>}
      {addreview && <View style={styles.overlay}></View>}
      {!loading && (
        <ScrollView style={styles.profilePage}>
          <View style={styles.container}>
            {user && (
              <View style={styles.profile}>
                <View style={styles.top}>
                  <TouchableOpacity
                    style={styles.btnLogout}
                    onPress={handleLogout}
                  >
                    <FontAwesome name="sign-out" size={20} color="black" />
                  </TouchableOpacity>
                  <View style={styles.image}>
                    {user.user_image ? (
                      <Image
                        source={{
                          uri: `${BASE_URL}/images/${user.user_image}`,
                        }}
                        style={styles.img}
                      />
                    ) : (
                      <Image
                        source={require("../../../assets/default-user-icon.webp")}
                        style={styles.img}
                      />
                    )}
                  </View>
                </View>
                <View style={styles.all}>
                  <View style={styles.topinfo}>
                    <Text style={styles.name}>{user.name}</Text>
                  </View>
                  <View style={styles.info}>
                    <View style={styles.singleinfo}>
                      <MaterialCommunityIcons
                        name="email-outline"
                        size={28}
                        color="grey"
                      />
                      <Text style={styles.text}>{email}</Text>
                    </View>
                    <View style={styles.singleinfo}>
                      <MaterialCommunityIcons
                        name="phone"
                        size={28}
                        color="grey"
                      />
                      <Text style={styles.text}>
                        {!user.phone ? (
                          <Text style={{ color: "#d7d7d7" }}>
                            Doesn't exist
                          </Text>
                        ) : (
                          <Text>{user.phone}</Text>
                        )}
                      </Text>
                    </View>
                    <View style={styles.singleinfo}>
                      <MaterialCommunityIcons
                        name="map-marker-outline"
                        size={28}
                        color="grey"
                      />
                      <Text style={styles.text}>
                        {!user.address ? (
                          <Text style={{ color: "#d7d7d7" }}>
                            Doesn't exist
                          </Text>
                        ) : (
                          <Text>{user.address}</Text>
                        )}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <MaterialIcons
                      name="border-color"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>
                  <View style={styles.taken}>
                    <Text style={styles.takentitle}>Taken Trips</Text>

                    {myTripsData && (
                      <ScrollView style={styles.scroll}>
                        {myTripsData.map((trip) => (
                          <TakenTrip
                            trip={trip}
                            key={trip.id}
                            setAddReview={setAddReview}
                            setTripId={setTripId}
                          />
                        ))}
                      </ScrollView>
                    )}
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      )}
      {edit && (
        <EditProfile
          setEdit={setEdit}
          setSuccess={setSuccess}
          updateProfileImage={updateProfileImage}
        />
      )}
      {addreview && (
        <AddReview
          setAddReview={setAddReview}
          tripid={tripid}
          setRatingSuccess={setRatingSuccess}
        />
      )}
      {ratingsuccess && (
        <View style={styles.successrating}>
          <Text style={styles.successratingText}>
            Review Added successfully
          </Text>
        </View>
      )}
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 20,
    position: "relative",
  },
  profilePage: {
    backgroundColor: "white",
  },
  profile: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  scroll: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
  },
  top: {
    height: 180,
    width: "100%",
    backgroundColor: "#E87A00",
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    zIndex: 500,
  },
  image: {
    position: "absolute",
    bottom: "-30%",
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: "hidden",
    left: "25%",
    backgroundColor: "#d7d7d7",
    transform: [{ translateX: 50 }],
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  topinfo: {
    marginTop: 70,
  },
  name: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    textAlign: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginTop: 40,
  },
  singleinfo: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  all: {
    width: "93%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontWeight: "bold",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E87A00",
    padding: 10,
    borderRadius: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  taken: {
    marginTop: 20,
  },
  takentitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  btnLogout: {
    position: "absolute",
    right: 10,
    top: 50,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
  logout: {
    color: "#e87a00",
    fontWeight: "bold",
  },
  successrating: {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: [{ translateX: 50 }, { translateY: 50 }],
    backgroundColor: "black",
    padding: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  successratingText: {
    color: "green",
    fontWeight: "bold",
  },
});
