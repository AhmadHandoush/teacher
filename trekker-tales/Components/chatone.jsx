import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BASE_URL } from "../app/utils/constants";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";

const ChatCard = ({ user }) => {
  const navigation = useNavigation();
  const router = useRouter();
  const { id, name, user_image } = user;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("chat1", { name: name, id: id })}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: `${BASE_URL}/images/${user_image}` }}
          style={styles.image}
        />
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;

const styles = StyleSheet.create({
  card: {
    widht: "100%",
    height: 80,
    backgroundColor: "white",
    overflow: "hidden",
    padding: 5,
    display: "flex",
    flexDirection: "row",
    gap: 10,
    borderRadius: 10,
    alignItems: "center",
    elevation: 5,
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
});
