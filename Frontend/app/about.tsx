import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const About = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={[styles.card, hoveredCard === 1 && styles.cardHover]}
        onPressIn={() => handleCardHover(1)}
        onPressOut={handleCardLeave}
      >
        <View style={styles.cardBody}>
          <Text style={styles.title}>Secure Connect</Text>
          <Text style={styles.text}>
            Secure Connect is a safety-focused app designed to enhance personal security by connecting a wearable device with a real-time alerting system. This innovative app uses a Wi-Fi and Bluetooth-enabled ESP32 wearable device that sends an alert signal to a central web server via the WebSocket protocol. In case of an emergency, the server immediately notifies nearby users within a 100-meter radius through the Secure Connect app, built with React Native, ensuring rapid response in critical situations.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, hoveredCard === 2 && styles.cardHover]}
        onPressIn={() => handleCardHover(2)}
        onPressOut={handleCardLeave}
      >
        <View style={styles.cardBody}>
          <Text style={styles.subtitle}>Overview</Text>
          <Text style={styles.text}>
            The Secure Connect project integrates hardware and software to create a comprehensive, responsive alert system. At its core, an ESP32 wearable device detects distress signals and relays these to a web server. Using the WebSocket protocol, this alert is then distributed to the Secure Connect app, where nearby users receive notifications alongside the geolocation of the user needing assistance.
          </Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, hoveredCard === 3 && styles.cardHover]}
        onPressIn={() => handleCardHover(3)}
        onPressOut={handleCardLeave}
      >
        <View style={styles.cardBody}>
          <Text style={styles.subtitle}>Technologies Used</Text>
          <Text style={styles.text}>The platform integrates advanced technologies to deliver a seamless user experience:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>React Native</Text>: React Native is a JavaScript framework for building natively rendered mobile applications for iOS and Android using React..
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>FastAPI</Text>: A high-performance web framework for Python 3.7+ that facilitates rapid API development.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Websockets</Text>: WebSockets is a communication protocol that enables real-time, bidirectional data exchange between a client and server over a single, persistent connection.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>ESP 32</Text>: The ESP32 is a low-cost, low-power microcontroller with built-in Wi-Fi and Bluetooth, ideal for IoT applications and embedded systems.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Python</Text>: A versatile programming language extensively used in web development, scientific computing, and AI.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Axios</Text>: A promise-based HTTP client for making efficient HTTP requests from browsers and Node.js.
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    maxWidth: 800,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#1c1c1e',
  },
  card: {
    marginBottom: 24,
    borderRadius: 18,
    backgroundColor: '#2c2c2e',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardBody: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFA500',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 28,
    color: '#FFA500',
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
  },
  list: {
    paddingLeft: 20,
  },
  listItem: {
    marginBottom: 12,
    fontSize: 16,
    color: 'white',
  },
  bold: {
    fontWeight: 'bold',
    color: 'white'
  },
  cardHover: {
    transform: [{ scale: 1.05 }],
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
});

export default About;