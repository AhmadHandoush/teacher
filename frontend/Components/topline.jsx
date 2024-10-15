import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Topline = () => {
  return <View style={styles.topbar} />;
};

export default Topline;

const styles = StyleSheet.create({
  topbar: {
    width: "30%",
    height: 3,
    backgroundColor: "black",
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
});
