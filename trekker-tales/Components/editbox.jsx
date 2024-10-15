import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { BASE_URL } from "../app/utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ setEdit, setSuccess, updateProfileImage }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setImage(selectedUri);
      updateProfileImage(selectedUri);
    }
  };

  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    if (!name || !phone || !address || !image) {
      Alert.alert("All fields are required ");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("user_image", {
        uri: image,
        type: "image/jpeg",
        name: "photo.jpg",
      });
      formData.append("name", name);
      formData.append("address", address);
      formData.append("phone", phone);

      const response = await axios.post(
        `${BASE_URL}/api/update_user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess(true);
      setEdit(false);

      setTimeout(() => setSuccess(false), 2000);

      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <View style={styles.edit}>
      <View style={styles.closesection}>
        <TouchableOpacity
          style={styles.btn_close}
          onPress={() => setEdit(false)}
        >
          <Text style={styles.close_text}>X</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}> Edit Profile</Text>
      <View>
        <TextInput
          style={styles.inputfield}
          placeholder="Add your NEW name"
          onChangeText={setName}
          value={name}
          selectionColor={"#E87A00"}
          required
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.inputfield}
          placeholder="Add your NEW number"
          onChangeText={setPhone}
          value={phone}
          selectionColor={"#E87A00"}
          required
          placeholderTextColor="#808080"
        />
        <TextInput
          style={styles.inputfield}
          placeholder="Add your NEW address"
          onChangeText={setAddress}
          value={address}
          selectionColor={"#E87A00"}
          required
          placeholderTextColor="#808080"
        />
        <TouchableOpacity onPress={pickImage}>
          <Text style={styles.forImage}>Change your photo </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSave} style={styles.btn_save}>
          <Text style={styles.save_text}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  edit: {
    position: "absolute",
    width: 300,

    marginRight: 200,
    backgroundColor: "white",
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: 5,
    top: "40%",
    left: "50%",
    transform: [{ translateX: -150 }, { translateY: -50 }],
    zIndex: 2000,
    borderRadius: 8,
  },
  forImage: {
    color: "#e87a00",
    textDecorationLine: "underline",
  },
  closesection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: "row",
  },
  btn_close: {
    width: 30,
    height: 30,
    backgroundColor: "black",
    borderRadius: 15,
    padding: 1,
    textAlign: "right",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -25,
    top: -20,
  },
  close_text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  inputfield: {
    padding: 5,
    backgroundColor: "#d7d7d7",
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
  btn_save: {
    backgroundColor: "#e87a00",
    padding: 5,
    width: "50%",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 15,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  save_text: {
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
});
