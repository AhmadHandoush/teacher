import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../app/utils/constants";

const Solo = ({ parent, router }) => {
  const [mine, setMine] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const get_data = async () => {
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

          setMine(data.user);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    get_data();
  }, []);
  const handleChat = () => {
    router.push({
      pathname: "/(teacher)/chats/chatt",
      params: parent,
    });
  };
  return (
    <TouchableOpacity onPress={handleChat}>
      <View style={styles.conversation}>
        {parent.user_image ? (
          <Image
            source={{
              uri: `${BASE_URL}/images/${parent.user_image}`,
            }}
            style={styles.image}
          />
        ) : (
          <Image
            source={require("../assets/default-user-icon.webp")}
            style={styles.image}
          />
        )}

        <View style={styles.info}>
          <Text style={styles.name}>{parent.name}</Text>
          <Text style={styles.email}>{parent.email}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Solo;

const styles = StyleSheet.create({
  conversation: {
    backgroundColor: "transparent",
    width: "100%",
    overflow: "hidden",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    marginLeft: 5,
    gap: 10,

    paddingBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    color: "#808080",
    fontSize: 12,
  },
});
