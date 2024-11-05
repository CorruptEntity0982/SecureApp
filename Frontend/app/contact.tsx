import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const Contact: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Contact Page!</Text>
      <Button title="Back" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1c1c1e",
  },
  text: {
    fontSize: 20,
    color: "white",
  },
});

export default Contact;
