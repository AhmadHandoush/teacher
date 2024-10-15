import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils/constants";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import Solo from "../../../Components/solochat";
import SoloParent from "../../../Components/soloparent";
import Back from "../../../Components/back";

const Chats = () => {
  const [parentList, setParentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    const get_data = async () => {
      setLoading(true);
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const response = await fetch(`${BASE_URL}/api/get_teachers`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const data = await response.json();

          setParentList(data.teachers);
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    get_data();
  }, []);

  return (
    <View style={styles.page}>
      <Back title={"Chat"} />
      <View style={styles.top}></View>
      <View style={styles.bottom}>
        <View style={styles.textsection}>
          <Text style={styles.text}>
            Welcome to our chat, <Text style={styles.mainName}>Sidra</Text> is
            the coordinator of all the trips, so if you have any inquiry plz
            don't hesitate to talk with her.
          </Text>
        </View>
        <View>
          {parentList && (
            <View
              style={{
                flex: 1,
                paddingTop: 100,
                paddingLeft: 100,
                backgroundColor: "re",
              }}
            >
              {parentList.map((parent) => (
                <SoloParent key={parent.id} parent={parent} router={router} />
              ))}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  conversation: {
    padding: 10,
    marginBottom: 20,
    backgroundColor: "red",
    width: "80%",
    marginLeft: 10,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },

  top: {
    width: "100%",
    height: 150,
    backgroundColor: "#e87a00",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  bottom: {
    width: "93%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
  },
  mainName: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textsection: {
    marginTop: 50,
  },
});
