import { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    Touchable,
    TouchableOpacity,
    Alert,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import { registerUser } from "../../app/services/auth";

const RegisterScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const onRegister = async () => {
        try {
            await registerUser({
                email,
                name,
                password,
            });

            Alert.alert("Sukses register", "Silahkan masuk dengan akun anda");
        } catch (error) {
            console.error(error.response.data);
            Alert.alert("Gagal Daftar", error.response.data.message);
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
            <KeyboardAvoidingView
                style={styles.containerKey}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.formWrap}>
                        <View style={styles.form}>
                            <Text style={{ fontSize: 46, fontWeight: "700" }}>
                                Sign Up
                            </Text>
                            <View style={{ marginTop: 40 }}>
                                <TextInput
                                    style={styles.inputBar}
                                    placeholder="Masukkan email anda"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <TextInput
                                    style={styles.inputBar}
                                    placeholder="Masukkan nama lengkap anda"
                                    value={name}
                                    onChangeText={setName}
                                />
                                <TextInput
                                    style={styles.inputBar}
                                    secureTextEntry={true}
                                    value={password}
                                    onChangeText={setPassword}
                                    placeholder="Masukkan password anda"
                                />
                            </View>
                            <View
                                style={{ alignItems: "center", marginTop: 30 }}
                            >
                                <TouchableOpacity
                                    onPress={onRegister}
                                    style={styles.buttonAtas}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "700",
                                            color: "white",
                                            fontSize: 20,
                                        }}
                                    >
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                                <Text
                                    style={{ fontSize: 17, color: "#B8B2B2" }}
                                >
                                    atau
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.navigate("LoginScreen");
                                    }}
                                    style={styles.buttonBawah}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "700",
                                            color: "#0984e3",
                                            fontSize: 20,
                                        }}
                                    >
                                        Login
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </View>
    );
};

export default RegisterScreen;

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
    containerKey: {
        flex: 1,
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
