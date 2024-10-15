import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Back = ({ title }) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.btn}>
      <TouchableOpacity onPress={goBack}>
        <MaterialIcons name="keyboard-arrow-left" size={35} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <Text></Text>
    </View>
  );
};

export default Back;

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    top: 40,
    left: 5,
    zIndex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 100,
    alignItems: "center",
    width: "100%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 30,
  },
});
