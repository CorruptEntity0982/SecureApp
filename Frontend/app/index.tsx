// index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./home";
import About from "./about";
import Contact from "./contact";

export type RootStackParamList = {
  Home: undefined;
  About: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="About" component={About} options={{ title: "About" }} />
        <Stack.Screen name="Contact" component={Contact} options={{ title: "Contact" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;