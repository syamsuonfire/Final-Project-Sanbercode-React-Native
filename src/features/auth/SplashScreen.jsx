import { useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useCallback } from "react";
import { Text, View, Image } from "react-native";
import { useDispatch } from "react-redux";

import { me } from "../../app/services/auth";
import { login } from "./authSlice";

const SplashScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            const validateToken = async () => {
                try {
                    const token = await SecureStore.getItemAsync("token");

                    if (token) {
                        // eslint-disable-next-line no-param-reassign
                        console.log("Token Detected, Validating");
                        const res = await me({ token });

                        console.log("Token is Valid, logging in", res.data);
                        dispatch(login({ token }));

                        return;
                    }

                    // If no token go to login
                    setTimeout(() => {
                        navigation.replace("LoginScreen");
                    }, 3000);
                } catch (error) {
                    console.log("Token Not Valid");
                    SecureStore.deleteItemAsync("token");
                    console.error(error);
                }
            };

            validateToken();
        }, [])
    );

    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Image
                source={require("../../../assets/logo/logo.png")}
                style={{
                    width: 200,
                    height: 200,
                }}
            />
        </View>
    );
};

export default SplashScreen;
