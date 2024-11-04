import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';

const App: React.FC = () => {
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [connection, setConnection] = useState(false);
  const [alerts, setAlerts] = useState<{ id: number; time: string }[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const serverAddress = 'ws://172.20.10.2:3000';

  useEffect(() => {
    ws.current = new WebSocket(serverAddress);
    ws.current.onopen = () => {
      console.log('Connected to WebSocket');
      setConnection(true);
      ws.current?.send(JSON.stringify({ type: 'register', device: 'react' }));
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === 'esp32-alert') {
        handleAlert();
      }
    };
    ws.current.onerror = (e) => {
      console.log('WebSocket error');
    };
    ws.current.onclose = () => {
      setConnection(false);
      console.log('Disconnected from WebSocket');
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (alertTriggered) {
      const time = new Date().toLocaleTimeString();
      setAlerts((prevAlerts) => [...prevAlerts, { id: Date.now(), time }]);
      Alert.alert('Alert', 'An alert has been triggered!', [
        {
          text: 'Close Alert',
          onPress: () => {
            setAlertTriggered(false);
            ws.current?.send(JSON.stringify({ type: 'reset' }));
          },
          style: 'cancel',
        },
      ]);
    }
  }, [alertTriggered]);
  const handleAlert = () => {
    setAlertTriggered(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
      {/* Profile Section */}
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
      
      {/* Connection Card */}
      <View style={styles.titleCard}>
        <Text style={styles.title}>Connection Status </Text>
        <View
          style={[
            styles.connectionIndicator,
            {
              backgroundColor:
                connection ? 'green' : 'red',
            },
          ]}
        />
      </View>


      {/* Alert Title Card */}
      <View style={styles.titleCard}>
        <Text style={styles.title}>Alert System</Text>
        <Text style={styles.alertStatus}>
          {alertTriggered ? 'Alert Triggered' : 'No Alerts'}
        </Text>
      </View>

      {/* Alerts Section */}
      <ScrollView style={styles.alertsContainer}>
        {alerts.map((alert) => (
          <View key={alert.id} style={styles.alertCard}>
            <Text style={styles.alertText}>Alert triggered at {alert.time}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomButton}>About</Text>
        <Text style={styles.bottomButton}>Contact</Text>
        <Text style={styles.bottomButton}>YouTube Demo</Text>
      </View>
    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e',
  },
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
  titleCard: {
    backgroundColor: '#2c2c2e',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  alertStatus: {
    fontSize: 18,
    color: 'lightgray',
    marginTop: 10,
  },
  alertsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  alertCard: {
    backgroundColor: '#3a3a3c',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  alertText: {
    color: 'white',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#2c2c2e',
  },
  bottomButton: {
    color: 'white',
    fontSize: 16,
  },
  connectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginTop: 10,
  },
});

export default App;
