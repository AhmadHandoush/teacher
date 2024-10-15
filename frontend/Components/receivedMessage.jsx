import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const ReceivedMessage = () => {
  return (
    <View style={styles.received}>
      <View style={styles.img}>
        <Image
          source={require("../assets/360_F_302884605_actpipOdPOQHDTnFtp4zg4RtlWzhOASp.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.msg}>
        <Text style={styles.message}></Text>
      </View>
    </View>
  );
};

export default ReceivedMessage;

const styles = StyleSheet.create({
  received: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
