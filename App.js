import { Platform, SafeAreaView, UIManager } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EntryPage from "./src/pages/EntryPage";
import AvailableParkingMainPage from "./src/pages/AvailableParking/MainPage";
import AvailableParkingResultPage from "./src/pages/AvailableParking/ResultPage";
import SaveParkingMainPage from "./src/pages/SaveParking/MainPage";
import SaveParkingResultPage from "./src/pages/SaveParking/ResultPage";
import FindingCarMainPage from "./src/pages/FindingCar/MainPage";
import FindingCarResultPage from "./src/pages/FindingCar/ResultPage";
import MapPage from "./src/pages/MapPage";

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
                <Stack.Screen name="SaveParkingMainPage" component={SaveParkingMainPage} />
                <Stack.Screen name="SaveParkingResultPage" component={SaveParkingResultPage} />
                <Stack.Screen name="FindingCarMainPage" component={FindingCarMainPage} />
                <Stack.Screen name="FindingCarResultPage" component={FindingCarResultPage} />
                <Stack.Screen name="MapPage" component={MapPage} />
              </Stack.Navigator>
            </GestureHandlerRootView>
          </SafeAreaView>
      </NavigationContainer>
  );
}
