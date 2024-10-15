import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import React from "react";
import { Link } from "expo-router";

const Main = () => {
  return (
    <ImageBackground
      source={require("../assets/pexels-qjpioneer-917510 (1).jpg")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.top}>
          <Text style={styles.text}>Welcome to </Text>
          <Text style={styles.mainName}></Text>
          <Text style={styles.name}>TREKKER TALES</Text>
        </View>

        <Link href="/login" asChild style={styles.link}>
          <Pressable>
            <Text style={styles.btntext}>Get Started</Text>
          </Pressable>
        </Link>
      </View>
    </ImageBackground>
  );
};

export default Main;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    paddingBottom: 30,
    paddingTop: 30,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  top: {},
  text: {
    top: 50,
    color: "white",
    fontSize: 20,
    textAlign: "center",
  },
  mainName: {
    color: "white",
    textAlign: "center",
    fontSize: 32,
  },
  name: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontSize: 32,
    fontWeight: "bold",
  },
  link: {
    backgroundColor: "#E87A00",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    padding: 10,
    marginBottom: 60,
  },
  btntext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
  },
});
