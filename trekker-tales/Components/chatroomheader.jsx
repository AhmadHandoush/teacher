import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { BASE_URL } from "../app/utils/constants";
import Back from "./back";

const ChatroomHeader = ({ user, router }) => {
  return (
    <View>
      <Back title={user.name} />
    </View>
  );
};

export default ChatroomHeader;

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
});
