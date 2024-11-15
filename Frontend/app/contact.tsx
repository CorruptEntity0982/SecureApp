import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Contact = () => {
  const name = "Shashank Dubey";
  const role = "Technical Lead, Fullstack Developer";
  const linkedin = "https://www.linkedin.com/in/shashank-dubey-b3684a21b/";
  const github = "https://github.com/CorruptEntity0982";
  const email = "shashank02.dubey@gmail.com";
  const imageUrl = 'https://media.licdn.com/dms/image/v2/D5603AQFj6VxqGaUB9w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728309909311?e=1736380800&v=beta&t=Dok32uV7aWgkGTOnO8RPGPA0UeSFE88PTRdkzEPKixE'

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Me</Text>
      <View style={styles.memberContainer}>
        <Image source={{ uri: imageUrl }} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{role}</Text>
        <Text style={styles.contactTitle}>Contact Me At</Text>
        <View style={styles.iconsContainer}>
          <Icon
            name="linkedin"
            size={30}
            color="#0A66C2"
            onPress={() => Linking.openURL(linkedin)}
          />
          <Icon
            name="github"
            size={30}
            color="black"
            onPress={() => Linking.openURL(github)}
          />
          <Icon
            name="youtube"
            size={30}
            color="#3E65CF"
            onPress={() => Linking.openURL('https://youtu.be/8d82Edmv8FQ')}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#1c1c1e",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: '#FFA500'

  },
  memberContainer: {
    alignItems: "center",
    backgroundColor: "#2c2c2e",
    borderRadius: 15,
    padding: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    color: '#FFA500'
  },
  role: {
    fontSize: 16,
    marginBottom: 10,
    color: 'white'
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: 'white'
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20, 
  },
});

export default Contact;