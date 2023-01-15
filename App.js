import { Platform, SafeAreaView, UIManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryPage from "./src/pages/EntryPage";
import AvailableParkingMainPage from "./src/pages/AvailableParking/MainPage";
import AvailableParkingResultPage from "./src/pages/AvailableParking/ResultPage";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

export default function App() {
  if (Platform.OS === "android")
    UIManager.setLayoutAnimationEnabledExperimental(true);

  return (
      <NavigationContainer>
          <SafeAreaView className="flex-1">
            <GestureHandlerRootView className="flex-1">
              <Stack.Navigator initialRouteName="EntryPage">
                <Stack.Screen name="EntryPage" component={EntryPage} />
                <Stack.Screen name="AvailableParkingMainPage" component={AvailableParkingMainPage} />
                <Stack.Screen name="AvailableParkingResultPage" component={AvailableParkingResultPage} />
              </Stack.Navigator>
            </GestureHandlerRootView>
          </SafeAreaView>
      </NavigationContainer>
  );
}
