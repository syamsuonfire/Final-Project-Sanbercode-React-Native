import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Touchable,
    TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";

import { loginUser } from "../../app/services/auth";
import { login } from "./authSlice";

const LoginScreen = ({ navigation }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onLogin = async () => {
        try {
            const res = await loginUser({
                email,
                password,
            });

            dispatch(
                // Dispatch token dari response api
                login({
                    token: res.data?.results.token,
                })
            );
        } catch (error) {
            console.error(error.response.data);
            Alert.alert("Login Gagal", error.response.data.message);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image
                    style={{ height: 150, width: 150 }}
                    source={require("../../../assets/logo/logo.png")}
                />
            </View>
            <View style={styles.formWrap}>
                <View style={styles.form}>
                    <Text style={{ fontSize: 46, fontWeight: "700" }}>
                        Login
                    </Text>
                    <View style={{ marginTop: 40 }}>
                        <TextInput
                            style={styles.inputBar}
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Masukkan email anda"
                        />
                        <TextInput
                            style={styles.inputBar}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={true}
                            placeholder="Masukkan password anda"
                        />
                    </View>
                    <View style={{ alignItems: "center", marginTop: 90 }}>
                        <TouchableOpacity
                            onPress={onLogin}
                            style={styles.buttonAtas}
                        >
                            <Text
                                style={{
                                    fontWeight: "700",
                                    color: "white",
                                    fontSize: 20,
                                }}
                            >
                                Login
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 17, color: "#B8B2B2" }}>
                            atau
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("RegisterScreen")
                            }
                            style={styles.buttonBawah}
                        >
                            <Text
                                style={{
                                    fontWeight: "700",
                                    color: "#0984e3",
                                    fontSize: 20,
                                }}
                            >
                                Sign Up
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#38394B",
        flex: 1,
    },
    imageWrapper: {
        alignItems: "center",
        justifyContent: "center",
        height: 215,
        width: 411,
    },
    formWrap: {
        flex: 1,
        backgroundColor: "#FCFEFF",
        borderWidth: 0,
        borderTopRightRadius: 35,
        borderTopLeftRadius: 35,
    },
    form: {
        marginVertical: 32,
        marginHorizontal: 27,
    },
    inputBar: {
        borderBottomWidth: 1,
        borderBottomColor: "#B8B2B2",
        height: 36,
        fontSize: 18,
        marginBottom: 25,
        paddingHorizontal: 10,
    },
    buttonAtas: {
        borderRadius: 15,
        borderWidth: 0,
        backgroundColor: "#0984e3",
        width: 304,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 18,
    },
    buttonBawah: {
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#0984e3",
        width: 304,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 18,
    },
});
