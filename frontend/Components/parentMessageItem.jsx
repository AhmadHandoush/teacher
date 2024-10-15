import { StyleSheet, Text, View } from "react-native";
import React from "react";

const MessageItem = ({ message, mine }) => {
  return (
    <>
      {mine && (
        <View style={mine.id == message.userId ? styles.my : styles.received}>
          <View style={mine.id == message.userId ? styles.se : styles.rec}>
            <Text style={styles.sent}>{message.text}</Text>
          </View>
        </View>
      )}
    </>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  sending: {
    width: "fit-content",
    maxWidth: "100%",
    marginBottom: 10,

    display: "flex",
    flexDirection: "row",
  },
  se: {
    backgroundColor: "#e87a00",
    maxWidth: "80%",
    padding: 8,
    borderRadius: 8,
  },
  sent: {
    width: "auto",
  },
  received: {
    borderRadius: 10,
    marginBottom: 10,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  my: {
    width: "100%",
    borderRadius: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  rec: {
    backgroundColor: "white",
    maxWidth: "80%",
    padding: 8,
    borderRadius: 8,
  },
});
