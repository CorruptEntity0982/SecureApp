#include <WiFi.h>
#include <WebSocketClient.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

#define BUTTON_PIN 13
#define LED_PIN 12
#define BUZZER_PIN 14
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 32
#define OLED_RESET -1

const char* ssid = "shashank";
const char* password = "try12345";
const char* serverAddress = "ws://172.20.10.2:3000";

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);
WiFiClient wifiClient;
WebSocketClient webSocketClient;


bool alertTriggered = false;
unsigned long lastButtonPress = 0;
int pressCount = 0;

void connectToWiFi();
void connectToWebSocket();
void handleWebSocketMessage(String message);
void triggerAlert();
void resetAlert();

void setup() {
    Serial.begin(115200);
    pinMode(BUTTON_PIN, INPUT_PULLUP);
    pinMode(LED_PIN, OUTPUT);
    pinMode(BUZZER_PIN, OUTPUT);

    if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
        Serial.println(F("SSD1306 allocation failed"));
        for (;;);
    }
    display.clearDisplay();
    display.display();

    connectToWiFi();
    connectToWebSocket();
}

void loop() {
    if (webSocketClient.connected()) {
        webSocketClient.getData();
    }

    if (digitalRead(BUTTON_PIN) == LOW) {
        if (millis() - lastButtonPress < 500) {
            pressCount++;
            if (pressCount == 2 && !alertTriggered) {
                triggerAlert();
                String alertMessage = "{\"type\":\"esp32-alert\",\"lat\":12.9716,\"lng\":77.5946}";
                webSocketClient.sendData(alertMessage);
            }
        } else {
            pressCount = 1;
        }
        lastButtonPress = millis();
        delay(200);
    }
}

void connectToWiFi() {
    Serial.print("Connecting to WiFi...");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.print(".");
    }
    Serial.println("Connected to WiFi!");
}

void connectToWebSocket() {
    Serial.print("Connecting to WebSocket...");
    if (webSocketClient.connect(serverAddress)) {
        Serial.println("Connected to WebSocket!");
        webSocketClient.onMessage(handleWebSocketMessage);
    } else {
        Serial.println("WebSocket connection failed!");
    }
}

void handleWebSocketMessage(String message) {
    Serial.println("Message from server: " + message);
    if (message.indexOf("reset") != -1) {
        resetAlert();
    }
}

void triggerAlert() {
    alertTriggered = true;
    digitalWrite(LED_PIN, HIGH);
    tone(BUZZER_PIN, 1000);
    delay(3000);             
    noTone(BUZZER_PIN);      

    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 10);
    display.print("Alert Triggered!");
    display.display();
}

void resetAlert() {
    alertTriggered = false;
    digitalWrite(LED_PIN, LOW);
    
    display.clearDisplay();
    display.setTextSize(1);
    display.setTextColor(SSD1306_WHITE);
    display.setCursor(0, 10);
    display.print("System Normal");
    display.display();
}
