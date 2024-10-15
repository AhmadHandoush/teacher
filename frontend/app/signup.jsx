import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "expo-router";
import Topline from "../Components/topline";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "./utils/constants";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSignup = () => {
    const userData = {
      name: name,
      email: email,
      password: password,
    };
    fetch(`${BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Signup failed");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        setTimeout(() => navigation.navigate("login"), 3000);
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  return (
    <View style={styles.container}>
      {error && <Text>{error}</Text>}
      <View style={styles.logo}>
        <Image
          source={require("../assets/Borcelle (3).png")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={styles.login}>
        <Topline />
        <Text style={styles.title}>Sign Up</Text>
        <View
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 5 }}
        >
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={(text) => setName(text)}
            value={name}
            selectionColor={"#E87A00"}
          />
        </View>
        <View
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 5 }}
        >
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            onChangeText={(text) => setEmail(text)}
            value={email}
            keyboardType="email-address"
            selectionColor={"#E87A00"}
          />
        </View>
        <View
          style={{ marginLeft: "auto", marginRight: "auto", marginBottom: 10 }}
        >
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            selectionColor={"#E87A00"}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.passText}>
          Already have an account?{" "}
          <Link href={"/login"}>
            <Text style={{ color: "#E87A00", fontWeight: "bold" }}>
              {" "}
              Login{" "}
            </Text>
          </Link>
        </Text>
        {success && (
          <Text style={styles.success}>Account created Successfully...</Text>
        )}
      </View>
    </View>
  );
};

export default Signup;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",

    flex: 1,
  },

  logo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  login: {
    backgroundColor: "#F8F8F8",
    width: "100%",
    height: "65%",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
  },
  success: {
    color: "green",
    marginLeft: 30,
  },
  title: {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 26,
  },
  passText: {
    fontSize: 14,
    color: "black",
    padding: 10,
    marginLeft: 22,
  },
  input: {
    height: 45,
    borderWidth: 0,
    borderRadius: 6,
    width: 325,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
  },
  label: {
    paddingVertical: "1%",

    fontSize: 14,
  },
  button: {
    width: 325,
    height: 48,
    borderRadius: 10,
    backgroundColor: "#E87A00",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    paddingTop: "4%",
    alignSelf: "center",

    verticalAlign: "top",
  },
});
