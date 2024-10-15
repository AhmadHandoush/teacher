import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";

const OrWith = () => {
  return (
    <View>
      <View style={styles.all}>
        <View style={styles.one}></View>
        <Text style={styles.or}>Or Login with</Text>
        <View style={styles.two}></View>
      </View>

      <TouchableOpacity style={styles.google}>
        <Image
          source={require("../assets/google1.png")}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OrWith;

const styles = StyleSheet.create({
  google: {
    width: "50%",
    marginLeft: "auto",
    marginRight: "auto",
    height: 50,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    borderRadius: 10,
  },
  all: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 20,
  },
  one: {
    width: "30%",
    height: 1,
    backgroundColor: "#808080",
  },
  two: {
    width: "30%",
    height: 1,
    backgroundColor: "#808080",
  },
  or: {
    marginLeft: 10,
    marginRight: 10,
    fontWeight: "bold",
    color: "#808080",
  },
});
