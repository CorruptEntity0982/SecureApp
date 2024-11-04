#include <WiFi.h>
#include <WebSocketsClient.h>

const char* ssid = "shashank";           
const char* password = "try12345";   
const char* serverAddress = "ws://172.20.10.2:3000"; 

WebSocketsClient webSocket;
const int buttonPin = 13;  
const int ledPin = 12;    
const int buzzerPin = 14; 

int buttonState = HIGH;
int lastButtonState = HIGH;
unsigned long lastDebounceTime = 0;
unsigned long debounceDelay = 50;
bool alertTriggered = false;
int buttonPressCount = 0;

void setup() {
  Serial.begin(115200);
  pinMode(buttonPin, INPUT_PULLUP);
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");
  webSocket.begin("172.20.10.2", 3000, "/");
  webSocket.onEvent(webSocketEvent);
}

void loop() {
  webSocket.loop();
  checkButtonPress();
}

void checkButtonPress() {
  int reading = digitalRead(buttonPin);
  if (reading != lastButtonState) lastDebounceTime = millis();
  if ((millis() - lastDebounceTime) > debounceDelay) {
    if (reading == LOW && buttonState == HIGH) {
      buttonPressCount++;
      if (buttonPressCount == 2) {
        triggerAlert();
        buttonPressCount = 0;
      }
    }
    buttonState = reading;
  }
  lastButtonState = reading;
}

void triggerAlert() {
  alertTriggered = true;
  digitalWrite(ledPin, HIGH);
  tone(buzzerPin,1000);  
  delay(3000);            
  noTone(buzzerPin); 
  String message = "{\"type\": \"alert\"}";
  if (webSocket.isConnected()) {
    webSocket.sendTXT(message);
    Serial.println("Alert message sent to server");
  } else Serial.println("Failed to send alert message: WebSocket not connected");
}

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to WebSocket server");
      webSocket.sendTXT("{\"type\": \"register\", \"device\": \"esp32\"}");
      break;
    case WStype_TEXT:
      Serial.printf("Message from server to reset: %s\n", payload);
      resetAlert();
      break;
  }
}

void resetAlert() {
  alertTriggered = false;
  digitalWrite(ledPin, LOW);
  Serial.println("Alert reset by React Native app, LED turned off");
}
