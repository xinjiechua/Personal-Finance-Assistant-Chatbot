import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home_Page_1 from "../screens/Home_Page_1";
import Home_Page_2 from "../screens/Home_Page_2";
import Expenses_Page_1 from "../screens/Expenses_Main";
import Expenses_Page_2 from "../screens/Expenses_Add_Transaction";
import Profile_Page_1 from "../screens/Profile_Page_1";
import Login_Page from "../screens/Login_Page";
import Signup_Page from "../screens/Signup_Page";
import Landing_Page_1 from "../screens/Landing_Page_1";
import { useContext } from "react";
import { GlobalContext } from "../context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Chat from "../screens/Chat";
import Add_Transaction from "../screens/Expenses_Add_Transaction";

function AppNav() {
    const { isAuth, setIsAuth } = useContext(GlobalContext);
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();
    const HomeStack = createNativeStackNavigator();
    const screenOptions = ({ route }) => ({

        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
                iconName = HomeIcon;
            } else if (route.name === "Debt") {
                iconName = DebtIcon;
            } else if (route.name === "Expenses") {
                iconName = ExpensesIcon;
            } else if (route.name === "Consult") {
                iconName = ConsultIcon;
            } else if (route.name === "Profile") {
                iconName = ProfileIcon;
            }

            return (
                <Image
                    source={iconName}
                    style={{ width: size, height: size, tintColor: color }}
                />
            );
        },
        tabBarActiveTintColor: "#5F84A1",
        tabBarInactiveTintColor: "#000",
        tabBarStyle: tabBarOptions.style,
        tabBarHideOnKeyboard: { tabBarHideOnKeyboard: true },
    });
    function HomeStackScreen() {
        return (
            <HomeStack.Navigator>
                <HomeStack.Screen
                    name="Home1"
                    component={Home_Page_1}
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: "Dashboard",
                    }}
                />
                <HomeStack.Screen name="Home2" component={Home_Page_2} />
                <HomeStack.Screen
                    name="Chat"
                    component={Chat}
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: "",
                    }}
                />
            </HomeStack.Navigator>
        );
    }

    const ExpensesStack = createNativeStackNavigator();
    function ExpensesStackScreen() {
        return (
            <ExpensesStack.Navigator screenOptions={{ headerShown: true }}>
                <ExpensesStack.Screen
                    name="Expenses1"
                    component={Expenses_Page_1}
                    options={{
                        headerTitleAlign: "center",
                        headerTitle: "Expenses",
                    }}
                />
                <ExpensesStack.Screen
                    name="Add_Expenses"
                    component={Add_Transaction}
                    options={{
                        headerTitle: "",
                    }}
                />
            </ExpensesStack.Navigator>
        );
    }

    // const ChatStack = createNativeStackNavigator();
    // function ChatStackScreen() {
    //     return (
    //         <ChatStack.Navigator screenOptions={{ headerShown: false }}>
    //             <ChatStack.Screen
    //                 name="Landing"
    //                 component={Landing_Page_1}
    //                 initialParams={{ firstLaunch: firstLaunch }}
    //             />
    //             <ChatStack.Screen
    //                 name="Login"
    //                 component={Login}
    //                 initialParams={{ setIsAuth: setIsAuth }}
    //             />
    //             <ChatStack.Screen name="SignUp" component={SignUp} />
    //         </ChatStack.Navigator>
    //     );
    // }

    const ProfileStack = createNativeStackNavigator();
    function ProfileStackScreen() {
        return (
            <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
                <ProfileStack.Screen
                    name="Profile1"
                    component={Profile_Page_1}
                    initialParams={{setIsAuth: setIsAuth}}
                />
            </ProfileStack.Navigator>
        );
    }

    const LandingStack = createNativeStackNavigator();
    function LandingStackScreen() {
        return (
            <LandingStack.Navigator screenOptions={{ headerShown: false }}>
                <LandingStack.Screen
                    name="Landing1"
                    component={Landing_Page_1}
                />
                <LandingStack.Screen
                    name="Login"
                    component={Login_Page}
                    initialParams={{ setIsAuth: setIsAuth }}
                />
                <LandingStack.Screen name="SignUp" component={Signup_Page} />
            </LandingStack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            {isAuth === false ? (
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="Landing"
                        component={LandingStackScreen}
                    />
                </Stack.Navigator>
            ) : (
                <Tab.Navigator screenOptions={{ headerShown: false }}>
                    <Tab.Screen
                        name="Home"
                        component={HomeStackScreen}
                        screenOptions={screenOptions}
                    />
                    <Tab.Screen
                        name="Record"
                        component={ExpensesStackScreen}
                    />
                    <Tab.Screen name="Profile" component={ProfileStackScreen} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}

export default AppNav;
