import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import Profile from "./profile";
import BottomBar from "./bottombar";

const App: React.FC = () => {
  const [alertTriggered, setAlertTriggered] = useState(false);
  const [connection, setConnection] = useState(false);
  const [alerts, setAlerts] = useState<{ id: number; time: string }[]>([]);
  const ws = useRef<WebSocket | null>(null);
  const serverAddress = "ws://172.20.10.2:3000";

  useEffect(() => {
    ws.current = new WebSocket(serverAddress);
    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
      setConnection(true);
      ws.current?.send(JSON.stringify({ type: "register", device: "react" }));
    };
    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "esp32-alert") {
        handleAlert();
      }
    };
    ws.current.onerror = (e) => {
      console.log("WebSocket error");
    };
    ws.current.onclose = () => {
      setConnection(false);
      console.log("Disconnected from WebSocket");
    };
    return () => {
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    if (alertTriggered) {
      const time = new Date().toLocaleTimeString();
      setAlerts((prevAlerts) => [...prevAlerts, { id: Date.now(), time }]);
      Alert.alert("Alert", "An alert has been triggered!", [
        {
          text: "Close Alert",
          onPress: () => {
            setAlertTriggered(false);
            ws.current?.send(JSON.stringify({ type: "reset" }));
          },
          style: "cancel",
        },
      ]);
    }
  }, [alertTriggered]);

  const handleAlert = () => {setAlertTriggered(true);};

  return (
      <View style={styles.container}>
        <Profile />
        {/* Connection Card */}
        <View style={styles.titleCard}>
          <Text style={styles.title}>Connection Status </Text>
          <View
            style={[
              styles.connectionIndicator,
              {
                backgroundColor: connection ? "green" : "red",
              },
            ]}
          />
        </View>
        {/* Alert Title Card */}
        <View style={styles.titleCard}>
          <Text style={styles.title}>Alert System</Text>
          <Text style={styles.alertStatus}>
            {alertTriggered ? "Alert Triggered" : "No Active Alerts"}
          </Text>
        </View>
        {/* Alerts Section */}
        <ScrollView
          style={styles.alertsContainer}
          contentContainerStyle={styles.alertsContent}
        >
          {alerts.map((alert) => (
            <View key={alert.id} style={styles.alertCard}>
              <Text style={styles.alertText}>
                Alert triggered at {alert.time}
              </Text>
            </View>
          ))}
        </ScrollView>
        <BottomBar />      
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1e",
  },
  titleCard: {
    backgroundColor: "#2c2c2e",
    padding: 20,
    margin: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  alertStatus: {
    fontSize: 18,
    color: "lightgray",
    marginTop: 10,
  },
  alertsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  alertsContent: {
    paddingBottom: 20,
  },
  alertCard: {
    backgroundColor: "#3a3a3c",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  alertText: {
    color: "white",
  },
  connectionIndicator: {
    width: 20,
    height: 20,
    borderRadius: 10,
    
    marginTop: 10,
  },
});

export default App;
