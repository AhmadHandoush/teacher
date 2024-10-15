import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../app/utils/constants";
const BookCard = ({ setBook, setMessage, id, setBooked }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      const response = await fetch(`${BASE_URL}/api/add_book/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ child_name: inputValue }),
      });

      if (response.ok) {
        setBook(false);
        setBooked(true);
        setMessage("Your booking successfully completed");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      } else {
        Alert.alert("Error", "Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to send data");
    }
  };
  return (
    <View style={styles.box}>
      <TouchableOpacity style={styles.closebtn} onPress={() => setBook(false)}>
        <Text style={styles.close}>X</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Please enter your child's name"
        onChangeText={setInputValue}
        value={inputValue}
        style={styles.input}
        selectionColor={"#E87A00"}
        required
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.book}>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Book
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  box: {
    position: "absolute",
    zIndex: 200000,
    width: "80%",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    borderRadius: 6,
    padding: 20,
    top: "50%",
    left: "50%",
    transform: [{ translateX: -150 }],
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#808080",
    height: 40,
  },
  book: {
    backgroundColor: "#E87A00",
    padding: 10,
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  closebtn: {
    padding: 1,
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -20,
    right: -10,
  },
  close: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
});
