import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Topline from "./topline";

const ShowComments = ({ setOpenComments, postComments }) => {
  const close = () => {
    setOpenComments(true);
  };
  return (
    <View style={styles.comments}>
      <TouchableOpacity
        style={{ marginBottom: 20 }}
        onPress={() => setOpenComments(true)}
      >
        <View style={styles.topLine}></View>
      </TouchableOpacity>
      <Text style={styles.title}>Comments</Text>
      <ScrollView>
        {postComments.map((comment, index) => (
          <Text style={styles.comment} key={index}>
            {comment.comment}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default ShowComments;

const styles = StyleSheet.create({
  comments: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.9)",
    position: "absolute",
    height: "100%",
    top: 100,
    left: 0,
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
  },
  title: {
    color: "#e87a00",
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  close: {
    color: "white",
    textAlign: "right",
    fontWeight: "bold",
    fontSize: 20,
  },
  comment: {
    color: "white",
    marginBottom: 30,
  },
  topLine: {
    backgroundColor: "white",
    top: 10,
    width: "20%",
    height: 3,
    marginLeft: "auto",
    marginRight: "auto",
    borderRadius: 20,
  },
});
