import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";

import LoginScreen from "../features/auth/LoginScreen";
import RegisterScreen from "../features/auth/RegisterScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SplashScreen from "../features/auth/SplashScreen";
import MovieListScreen from "../features/movie/MovieListScreen";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "./../features/auth/ProfileScreen";
import DetailMovieScreen from "../features/movie/DetailMovieScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const RootStack = () => {
    const isSignedIn = useSelector((state) => state.auth.isSignedIn);

    return (
        <Stack.Navigator>
            {isSignedIn ? (
                <>
                    <Stack.Screen
                        name="MainApp"
                        component={MainApp}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="DetailMovie"
                        component={DetailMovieScreen}
                        options={{ headerShown: false }}
                    />
                </>
            ) : (
                <>
                    <Stack.Screen
                        name="SplashScreen"
                        component={SplashScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="LoginScreen"
                        component={LoginScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                        options={{ headerShown: false }}
                    />
                </>
            )}
        </Stack.Navigator>
    );
};

const MainApp = () => (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            activeTintColor: "#0984e3",
            inactiveTintColor: "gray",
            tabBarIcon: ({ focused, color, size }) => {
                if (route.name === "Home") {
                    return (
                        <Ionicons
                            name={
                                focused ? "ios-home-sharp" : "ios-home-outline"
                            }
                            size={size}
                            color={color}
                        />
                    );
                } else {
                    return (
                        <Ionicons
                            name={
                                focused
                                    ? "ios-person-circle-sharp"
                                    : "ios-person-circle-outline"
                            }
                            size={size}
                            color={color}
                        />
                    );
                }
            },
        })}
    >
        <Tab.Screen
            name="Home"
            component={MovieListScreen}
            options={{ headerShown: false }}
        />

        <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
        />
    </Tab.Navigator>
);
