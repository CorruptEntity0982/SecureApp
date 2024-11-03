import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Alert, Linking, StyleSheet } from 'react-native';
import WebSocket from 'react-native-websocket';
import SendSMS from 'react-native-sms';
import email from 'react-native-email-link';

interface AlertData {
  lat: number;
  lng: number;
}

const App: React.FC = () => {
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [locationLink, setLocationLink] = useState('');
  const ws = useRef<WebSocket | null>(null);

  const serverAddress = 'ws://172.20.10.2:3000';

  useEffect(() => {
    if (alertTriggered) {
      sendNotification();
    }
  }, [alertTriggered]);

  const sendNotification = () => {
    const messageBody = `Alert triggered! Check location: ${locationLink}`;

    SendSMS.send({
      body: messageBody,
      recipients: ['+917995845710'], 
      successTypes: ['sent', 'queued'],
      allowAndroidSendWithoutReadPermission: true,
    }, (completed, cancelled, error) => {
      console.log('SMS Callback: completed:', completed, 'cancelled:', cancelled, 'error:', error);
    });

    email({
      subject: 'Alert Triggered',
      body: messageBody,
      to: 'recipient@example.com', 
    }).catch(console.error);
  };

  const handleAlert = (data: AlertData) => {
    setAlertTriggered(true);
    setLocationLink(`https://www.google.com/maps/search/?api=1&query=${data.lat},${data.lng}`);
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert System</Text>
      <WebSocket
        url={serverAddress}
        onOpen={() => console.log('Connected to WebSocket')}
        onMessage={(e: WebSocketMessageEvent) => {
          const data = JSON.parse(e.data);
          if (data.type === 'esp32-alert') {
            handleAlert(data as AlertData);
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
