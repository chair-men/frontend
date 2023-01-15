import { Platform, SafeAreaView, UIManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryPage from "./src/pages/EntryPage";
import AvailableParkingPage from "./src/pages/AvailableParkingPage";

const Stack = createNativeStackNavigator();

export default function App() {
  if (Platform.OS === "android")
    UIManager.setLayoutAnimationEnabledExperimental(true);

  return (
    <NavigationContainer>
      <SafeAreaView className="flex-1">
        <Stack.Navigator initialRouteName="EntryPage">
          <Stack.Screen name="EntryPage" component={EntryPage} />
          <Stack.Screen name="AvailableParkingPage" component={AvailableParkingPage} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
