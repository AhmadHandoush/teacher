import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const Input = ({ label, placerholder }) => {
  return (
    <View style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={styles.input} placeholder={placerholder} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    height: 45,
    borderWidth: 0,
    borderRadius: 6,
    width: 325,
    padding: 10,
    borderWidth: 1,
    borderColor: "#FFE1E4",
    backgroundColor: "white",
  },
  label: {
    paddingVertical: "1%",
    fontWeight: "bold",
    fontSize: 16,
  },
});
