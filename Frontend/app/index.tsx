import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import WebSocket from 'react-native-websocket';

const App: React.FC = () => {
  const [alertTriggered, setAlertTriggered] = useState(false);
  const ws = useRef<WebSocket | null>(null);

  const serverAddress = 'ws://172.20.10.2:3000';

  useEffect(() => {
    if (alertTriggered) {
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
    <View style={styles.container}>
      <Text style={styles.title}>Alert System</Text>
      <WebSocket
        url={serverAddress}
        onOpen={() => {
          console.log('Connected to WebSocket');
          ws.current?.send(JSON.stringify({ type: 'register', device: 'react' }));
        }}
        onMessage={(e: WebSocketMessageEvent) => {
          const data = JSON.parse(e.data);
          if (data.type === 'esp32-alert') {
            handleAlert();
          }
        }}
        onError={(e: WebSocketErrorEvent) => console.log('WebSocket error', e.message)}
        onClose={() => console.log('Disconnected from WebSocket')}
        ref={ws}
      />
      {alertTriggered ? (
        <Text style={styles.alertText}>Alert Triggered! Check your notifications.</Text>
      ) : (
        <Text style={styles.alertText}>No Alerts</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  alertText: {
    fontSize: 18,
    color: 'red',
    marginTop: 20,
  },
});

export default App;
