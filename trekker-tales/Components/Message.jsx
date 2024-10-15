import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import MessageItem from "./messageItem";

const Message = ({ messages, mine }) => {
  return (
    <ScrollView>
      {messages.map((message, index) => (
        <MessageItem message={message} mine={mine} key={index} />
      ))}
    </ScrollView>
  );
};

export default Message;

const styles = StyleSheet.create({});
