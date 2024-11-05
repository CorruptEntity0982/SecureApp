import React from "react";
import { View, Text, StyleSheet, Pressable, Linking } from "react-native";

const BottomBar = () => {
  const openYouTubeVideo = () => {
    const youtubeUrl = "https://youtu.be/hbDJdxi52RQ?si=yoxHs8LnYMantEH2";
    Linking.openURL(youtubeUrl);
  };

  return (
      <View style={styles.bottomBar}>
      {/* <Pressable>
        <Text style={styles.bottomButton}>About</Text>
      </Pressable>
      <Pressable>
        <Text style={styles.bottomButton}>Contact</Text>
      </Pressable> */}
      <Pressable onPress={openYouTubeVideo}>
        <Text style={styles.bottomButton}>YouTube</Text>
      </Pressable>
    </View>    
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#2c2c2e",
    borderRadius: 20,
  },
  bottomButton: {
    color: "white",
    fontSize: 16,
  },
});

export default BottomBar;

