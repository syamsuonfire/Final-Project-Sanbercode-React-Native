import React, { useCallback, useState } from "react";
import { me } from "../../app/services/auth";
import * as SecureStore from "expo-secure-store";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import {
    AntDesign,
    MaterialCommunityIcons,
    MaterialIcons,
} from "@expo/vector-icons";
import { logout } from "../auth/authSlice";
import { useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";

const ProfileScreen = ({ navigation, route }) => {
    const [user, setUser] = useState({});
    const dispatch = useDispatch();

    useFocusEffect(
        useCallback(() => {
            const validateToken = async () => {
                try {
                    const token = await SecureStore.getItemAsync("token");

                    if (token) {
                        // eslint-disable-next-line no-param-reassign
                        const res = await me({ token });

                        setUser(res.data.results.user);

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
        <View style={{ flex: 1, backgroundColor: "#38394B" }}>
            <View style={styles.profile}>
                <View style={{ marginTop: 53, alignItems: "center" }}>
                    <Image
                        style={styles.avatarProfile}
                        source={require("../../../assets/img/blank.png")}
                    />
                    <Text
                        style={{
                            fontSize: 19,
                            color: "#FFFFFF",
                            fontWeight: "700",
                            marginTop: 15,
                            lineHeight: 23,
                        }}
                    >
                        {user.name}
                    </Text>
                    <Text
                        style={{
                            color: "#FFFFFF",
                            fontWeight: "500",
                            marginVertical: 5,
                            lineHeight: 14,
                        }}
                    >
                        {user.email}
                    </Text>
                </View>
            </View>
            <View style={styles.about}>
                <ScrollView>
                    <View
                        style={{ marginHorizontal: 36, marginTop: 20 }}
                    ></View>

                    <View style={{ marginHorizontal: 36 }}>
                        <TouchableOpacity style={styles.boxWrapper2}>
                            <View style={styles.boxShadow}>
                                <View
                                    style={{
                                        backgroundColor: "#38394B",
                                        width: 13,
                                    }}
                                ></View>
                                <View
                                    style={{
                                        backgroundColor: "#FFFF",
                                        flex: 1,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginHorizontal: 15,
                                            marginTop: 15,
                                        }}
                                    >
                                        <View style={styles.kontak}>
                                            <Text style={styles.textProfile}>
                                                Edit Profile
                                            </Text>
                                            <MaterialIcons
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                }}
                                                name="navigate-next"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.boxWrapper2}>
                            <View style={styles.boxShadow}>
                                <View
                                    style={{
                                        backgroundColor: "#38394B",
                                        width: 13,
                                    }}
                                ></View>
                                <View
                                    style={{
                                        backgroundColor: "#FFFF",
                                        flex: 1,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginHorizontal: 15,
                                            marginTop: 15,
                                        }}
                                    >
                                        <View style={styles.kontak}>
                                            <Text style={styles.textProfile}>
                                                About Us
                                            </Text>
                                            <MaterialIcons
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                }}
                                                name="navigate-next"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.boxWrapper2}>
                            <View style={styles.boxShadow}>
                                <View
                                    style={{
                                        backgroundColor: "#38394B",
                                        width: 13,
                                    }}
                                ></View>
                                <View
                                    style={{
                                        backgroundColor: "#FFFF",
                                        flex: 1,
                                    }}
                                >
                                    <View
                                        style={{
                                            marginHorizontal: 15,
                                            marginTop: 15,
                                        }}
                                    >
                                        <View style={styles.kontak}>
                                            <Text style={styles.textProfile}>
                                                Settings
                                            </Text>
                                            <MaterialIcons
                                                style={{
                                                    position: "absolute",
                                                    right: 0,
                                                }}
                                                name="navigate-next"
                                                size={24}
                                                color="black"
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity
                            onPress={() =>
                                Alert.alert(
                                    "PERINGATAN!",
                                    "Apakah anda yakin ingin keluar?",
                                    [
                                        {
                                            text: "Tidak",
                                            onPress: () =>
                                                console.log("button tidak"),
                                        },
                                        {
                                            text: "Ya",
                                            onPress: () => {
                                                dispatch(logout());
                                            },
                                        },
                                    ]
                                )
                            }
                            style={styles.buttonAtas}
                        >
                            <Text
                                style={{
                                    fontWeight: "700",
                                    color: "white",
                                    fontSize: 20,
                                }}
                            >
                                Logout
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    profile: {
        backgroundColor: "#38394B",
        flex: 1,
        alignItems: "center",
    },
    avatarProfile: {
        height: 81,
        width: 81,
        borderRadius: 81 / 2,
    },
    populerList: {
        borderWidth: 1,
        borderColor: "#E9EDF0",
        borderRadius: 13,
        height: 218,
        width: 120,
        marginRight: 10,
    },
    descKomik: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        justifyContent: "space-around",
    },
    cover: {
        width: 120,
        height: 142,
        borderWidth: 1,
        borderRadius: 13,
    },
    about: {
        backgroundColor: "white",
        flex: 3,
        borderWidth: 0,
        borderTopLeftRadius: 23,
        borderTopRightRadius: 23,
    },
    boxWrapper2: {
        flexDirection: "row",
        height: 50,
        marginTop: 25,
        borderWidth: 1,
        borderColor: "#D0D0D7",
        borderRadius: 20,
    },
    boxShadow: {
        flex: 1,
        flexDirection: "row",

        elevation: 8,
    },
    boxes: {
        backgroundColor: "#FFFF",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        margin: 10,
    },
    kontak: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    textProfile: {
        marginLeft: 15,
        fontSize: 18,
        fontWeight: "700",
    },
    navComponent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10,
    },
    h1: {
        fontSize: 24,
        lineHeight: 28,
        fontWeight: "700",
        marginBottom: 13,
    },
    buttonAtas: {
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: "#0984e3",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },
});
