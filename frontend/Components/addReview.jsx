import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
// import RNPickerSelect from "react-native-picker-select";
import { Picker } from "@react-native-picker/picker";
import { BASE_URL } from "../app/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddReview = ({ setAddReview, tripid, setRatingSuccess }) => {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const handleAddReview = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const reviewData = {
        rating: rating,
        content: content,
      };

      const response = await fetch(`${BASE_URL}/api/add_review/${tripid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setAddReview(false);
        setRatingSuccess(true);
        setTimeout(() => {
          setRatingSuccess(false);
        }, 2000);
      } else {
        console.error("Failed to add review");
      }
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };
  const handleclose = () => {
    setAddReview(false);
  };
  return (
    <View style={styles.reviewBox}>
      <TouchableOpacity style={styles.btn_close} onPress={handleclose}>
        <Text style={styles.text_close}>X</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add Review</Text>
      <View style={styles.rate}>
        <Text style={styles.bold}>Rating</Text>
        <Picker
          selectedValue={rating}
          onValueChange={(itemValue) => setRating(itemValue)}
          style={styles.select}
        >
          <Picker.Item label="1" value={1} />
          <Picker.Item label="2" value={2} />
          <Picker.Item label="3" value={3} />
          <Picker.Item label="4" value={4} />
          <Picker.Item label="5" value={5} />
        </Picker>
      </View>
      <View style={styles.content}>
        <Text style={styles.bold}>Content</Text>
        <TextInput
          value={content}
          placeholder="Enter your feedback"
          onChangeText={(text) => setContent(text)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity style={styles.add} onPress={handleAddReview}>
        <Text style={styles.addText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddReview;
const styles = StyleSheet.create({
  reviewBox: {
    position: "absolute",
    top: "50%",
    width: 300,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "white",
    padding: 10,
    transform: [{ translateX: 50 }, { translateY: 50 }],
    borderRadius: 8,
    zIndex: 9999,
  },
  btn_close: {
    position: "absolute",
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "black",
    top: -15,
    right: -10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text_close: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  rate: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 30,
    overflow: "hidden",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  select: {
    height: 20,
    width: 100,
    backgroundColor: "#d7d7d7",
    borderRadius: 6,
    overflow: "hidden",
  },
  bold: {
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#d7d7d7",
    padding: 5,
    borderRadius: 6,
    marginTop: 10,
  },
  add: {
    marginTop: 10,
    width: "50%",
    padding: 7,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#e87a00",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
  },
  addText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
