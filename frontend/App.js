
import GlobalState from './context';
import AppNav from './navigation/AppNav';
import { useFonts } from "expo-font";
export default function App() {

  const [fontsLoaded, fontError] = useFonts({
    InterBlack: require("./assets/fonts/Inter-Bold.ttf"),
    InterExtraLight: require("./assets/fonts/Inter-ExtraLight.ttf"),
    InterLight: require("./assets/fonts/Inter-Light.ttf"),
    InterMedium: require("./assets/fonts/Inter-Medium.ttf"),
    InterRegular: require("./assets/fonts/Inter-Regular.ttf"),
    InterSemiBold: require("./assets/fonts/Inter-SemiBold.ttf"),
    InterThin: require("./assets/fonts/Inter-Thin.ttf"),
    OpenSansBold: require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (

    <GlobalState>
      <AppNav />
    </GlobalState>
  );
}


