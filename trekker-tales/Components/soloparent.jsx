import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../app/utils/constants";
import Icon from "react-native-vector-icons/FontAwesome";

const SoloParent = ({ parent, router }) => {
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
      pathname: "/(tabs)/notifications/chat",
      params: parent,
    });
  };
  return (
    <TouchableOpacity style={styles.conversation} onPress={handleChat}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Text style={styles.name}>Start Chat</Text>
      </View>
    </TouchableOpacity>
  );
};

export default SoloParent;

const styles = StyleSheet.create({
  conversation: {
    backgroundColor: "#e87a00",
    width: "80%",
    height: 50,
    marginBottom: 10,
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -20,
  },
  name: {
    fontWeight: "bold",
    fontSize: 18,
    color: "white",
  },
  mainName: {
    fontWeight: "bold",
  },
});
