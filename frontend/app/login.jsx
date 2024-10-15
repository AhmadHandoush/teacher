import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import Topline from "../Components/topline";
import Input from "../Components/input";
import Button from "../Components/button";
import OrWith from "../Components/orwith";
// import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { BASE_URL } from "./utils/constants";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    const userData = {
      email: email,
      password: password,
    };

    fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("login failed");
        }
        return response.json();
      })
      .then((data) => {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2000);
        if (data.user.role == "teacher") {
          setTimeout(() => router.push("/(teacher)/home"), 1000);
        } else {
          setTimeout(() => router.push("/(tabs)/home"), 1000);
        }

        AsyncStorage.setItem("token", data.authorisation.token);
        AsyncStorage.setItem("user_id", JSON.stringify(data.user.id));
      })
      .catch((error) => {
        setError("Credentials Error");
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require("../assets/Borcelle (3).png")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={styles.login}>
        <Topline />
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          required
          selectionColor={"#E87A00"}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
          required
          selectionColor={"#E87A00"}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {error && <Text style={styles.error}>{error}</Text>}
        <Text style={styles.passText}>
          Don’t have an account?{" "}
          <Link href={"/signup"}>
            <Text style={{ color: "#E87A00", fontWeight: "bold" }}>
              Sign Up
            </Text>
          </Link>
        </Text>

        <OrWith />
      </View>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "white",
    flexDirection: "column",
    justifyContent: "center",

    flex: 1,
  },
  login: {
    paddingLeft: 10,
    backgroundColor: "#F8F8F8",
  },
  input: {
    height: 45,
    color: "#333",

    borderRadius: 6,
    width: 325,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "white",
    marginLeft: 30,
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
  label: {
    paddingVertical: "1%",

    fontSize: 14,
    marginLeft: 30,
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
  success: {
    color: "green",
    marginLeft: 30,
  },
  error: {
    color: "red",
    marginLeft: 30,
  },
});
