#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <WiFi.h>
#include <WebSocketsClient.h>

#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
const char* ssid = "Rakesh";
const char* password = "rakesh@12345";
const char* serverUrl = "ws://192.168.0.139:8000"; // WebSocket URL
const int buttonPin = 13;  
const int ledPin = 12;     
const int buzzerPin = 14;  
int buttonState = 0;
int lastButtonState = 0;
int pressCount = 0;
unsigned long lastDebounceTime = 0;
const unsigned long debounceDelay = 50;

WebSocketsClient webSocket;

void setup() {
    Serial.begin(115200);
    Serial.println("Initializing...");

    pinMode(buttonPin, INPUT_PULLUP);
    pinMode(ledPin, OUTPUT);
    pinMode(buzzerPin, OUTPUT);

    initializeDisplay();
    connectToWiFi();
    
    webSocket.begin("192.168.1.5", 8000, "/"); // Update with your laptop's IP
    webSocket.onEvent(webSocketEvent);
}

void loop() {
    handleButtonPress();
    webSocket.loop(); // Keep WebSocket connection alive
    if (pressCount == 2) {
        pressCount = 0; 
        triggerAlert();
        sendAlertToServer();
    }
}

void initializeDisplay() {
    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {  
        Serial.println(F("SSD1306 allocation failed"));
        for (;;);
    }
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 0);
    display.println("Welcome Shashank");
    display.setCursor(0, 10);
    display.println("Standby mode active");
    display.display();
}

void connectToWiFi() {
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
}

void handleButtonPress() {
    int reading = digitalRead(buttonPin);
    if (reading != lastButtonState) {
        lastDebounceTime = millis();
    }

    if ((millis() - lastDebounceTime) > debounceDelay) {
        if (reading != buttonState) {
            buttonState = reading;
            if (buttonState == LOW) pressCount++;
        }
    }

    lastButtonState = reading;
}

void triggerAlert() {
    digitalWrite(ledPin, HIGH);
    tone(buzzerPin, 1000);  
    delay(3000);
    digitalWrite(ledPin, LOW);
    noTone(buzzerPin);
    
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("Connecting to server");
    display.display();
    delay(1000);
    
    display.clearDisplay();
    display.setCursor(0, 0);
    display.println("Alert Triggered");
    display.setCursor(0, 10);  // Move to the second line
    display.println("Sending Msg to Server");
    display.display();
    delay(3000);
    
    display.clearDisplay();
    initializeDisplay();  // Reset to welcome message
}

void sendAlertToServer() {
    webSocket.sendTXT("alert triggered"); // Send alert message
}

void webSocketEvent(WStype_t type, uint8_t* payload, size_t length) {
    if (type == WStype_TEXT) {
        String message = String((char*)payload);
        if (message == "Acknowledged. Stopping alert display.") {
            // Stop displaying the alert on the OLED
            display.clearDisplay();
            initializeDisplay();  // Reset to welcome message
        }
    }
}
