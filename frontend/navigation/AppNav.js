import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home_Page_1 from "../screens/Home_Page_1";
import Home_Page_2 from "../screens/Home_Page_2";
import Expenses_Page_1 from "../screens/Expenses_Page_1";
import Expenses_Page_2 from "../screens/Expenses_Page_2";
import Profile_Page_1 from "../screens/Profile_Page_1";
import Login_Page from "../screens/Login_Page";
import Signup_Page from "../screens/Signup_Page";
import Landing_Page_1 from "../screens/Landing_Page_1";
import { useContext } from "react";
import { GlobalContext } from "../context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Expenses_Main from '../screens/Expenses/Expenses_Main';
import Expenses_Add_1 from "../screens/Expenses/Expenses_Add_1";
import Expenses_Transaction from "../screens/Expenses/Expenses_Transaction";

function AppNav() {
    const { isAuth, setIsAuth } = useContext(GlobalContext);
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const HomeStack = createNativeStackNavigator();
    function HomeStackScreen() {
        return (
            <HomeStack.Navigator screenOptions={{ headerShown: false }}>
                <HomeStack.Screen name="Home1" component={Home_Page_1} />
                <HomeStack.Screen name="Home2" component={Home_Page_2} />
            </HomeStack.Navigator>
        );
    }

    const ExpensesStack = createNativeStackNavigator();
    function ExpensesStackScreen() {
        return (
            <ExpensesStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
                <ExpensesStack.Screen
                    name="Expenses_Main"
                    component={Expenses_Main}
                    options={{
                        title: 'Expenses',
                        headerTitleAlign: 'center',
                        headerBackTitle: '',
                        headerShown: false
                    }}
                />
                <ExpensesStack.Screen
                    name="Expenses_Transaction"
                    component={Expenses_Transaction}
                    options={{
                        title: 'Transaction',
                        headerTitleAlign: 'center',
                    }}
                />

                <ExpensesStack.Screen
                    name="Expenses_Add_1"
                    component={Expenses_Add_1}
                    options={{ headerTitle: '', headerBackTitle: '' }}
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
                />
            </ProfileStack.Navigator>
        );
    }

    const LandingStack = createNativeStackNavigator();
    function LandingStackScreen() {
        return (
            <LandingStack.Navigator>
                <LandingStack.Screen
                    name="Landing1"
                    component={Landing_Page_1}
                />
                <LandingStack.Screen name="Login" component={Login_Page} initialParams={{ setIsAuth: setIsAuth }} />
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
                <Tab.Navigator >
                    <Tab.Screen name="Home" component={HomeStackScreen} />
                    <Tab.Screen
                        name="Expenses"
                        component={ExpensesStackScreen}
                    />
                    <Tab.Screen name="Profile" component={ProfileStackScreen} />
                </Tab.Navigator>
            )}
        </NavigationContainer>
    );
}

export default AppNav;
