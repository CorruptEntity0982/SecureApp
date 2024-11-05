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
            Welcome to PDF Uploader, your premier solution for converting PDF
            documents into interactive quizzes. Our web application simplifies
            the process of transforming PDFs into engaging quizzes, making it
            effortless for educators, students, and professionals alike to
            convert educational materials into interactive assessments.
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
            Our platform's core functionality enables users to seamlessly upload
            PDF files and automatically generate quizzes based on their content.
            This feature is particularly advantageous in educational settings,
            empowering educators to efficiently create assessments from their
            existing teaching materials.
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
          <Text style={styles.text}>Our platform integrates advanced technologies to deliver a seamless user experience:</Text>
          <View style={styles.list}>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>React Native</Text>: A robust JavaScript library for building responsive and dynamic user interfaces.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>FastAPI</Text>: A high-performance web framework for Python 3.7+ that facilitates rapid API development.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>Websockets</Text>: Amazon Simple Storage Service provides scalable, secure, and high-performance object storage.
            </Text>
            <Text style={styles.listItem}>
              <Text style={styles.bold}>ESP 32</Text>: Amazon Elastic Compute Cloud offers resizable compute capacity in the cloud.
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