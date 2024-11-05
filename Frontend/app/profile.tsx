import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <View style={styles.profileContainer}>
      <Image
        source={{
          uri: 'https://media.licdn.com/dms/image/v2/D5603AQFj6VxqGaUB9w/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728309909311?e=1736380800&v=beta&t=Dok32uV7aWgkGTOnO8RPGPA0UeSFE88PTRdkzEPKixE',
        }}
        style={styles.profileImage}
      />
      <Text style={styles.profileName}>SHASHANK DUBEY</Text>
      <Text style={styles.profileEmail}>7995845710</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center', 
    marginTop: 50,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 22,
    color: 'white',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    color: 'gray',
  },
});

export default Profile;