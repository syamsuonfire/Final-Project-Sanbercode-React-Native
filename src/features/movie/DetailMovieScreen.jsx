import React, { useEffect, useState } from "react";
import Axios from "axios";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
    SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
    FlatList,
    TouchableWithoutFeedback,
} from "react-native-gesture-handler";

const DetailMovieScreen = ({ route, navigation }) => {
    const { itemId } = route.params;
    const [items, setItems] = useState({});

    useEffect(() => {
        // getData();
        Axios.get(`https://www.omdbapi.com/?apikey=eeb5b9c0&i=${itemId}`)

            .then((res) => {
                // console.log('res get data: ', res)
                setItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    return (
        <View style={{ flex: 1, marginBottom: 20 }}>
            <View style={{ flex: 1 }}>
                <Image
                    style={styles.mangaCover}
                    source={{ uri: items.Poster }}
                />
            </View>

            <View style={styles.detail}>
                <View style={styles.wrap}>
                    <ScrollView>
                        <View style={styles.headlineWrap}>
                            <Text style={styles.headline}>{items.Title}</Text>
                            <TouchableOpacity>
                                <Ionicons
                                    style={{
                                        flex: 1,
                                        position: "absolute",
                                        right: 0,
                                    }}
                                    name="star-outline"
                                    size={24}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#8A898E",
                                lineHeight: 24,
                            }}
                        >
                            {items.Director}
                        </Text>
                        <Text
                            style={{
                                fontSize: 16,
                                color: "#7E69CC",
                                lineHeight: 24,
                                fontWeight: "bold",
                            }}
                        >
                            {items.Genre}
                        </Text>

                        <View style={styles.content}>
                            <Text style={styles.headline2}>Synopsis</Text>
                            <Text numberOfLines={3} style={styles.descSynopsis}>
                                {items.Plot}
                            </Text>
                            <TouchableWithoutFeedback style={{ marginTop: 2 }}>
                                <Text style={{ color: "#2196F3" }}>
                                    Read more.
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    );
};

export default DetailMovieScreen;

const styles = StyleSheet.create({
    mangaCover: {
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        height: 449,
        width: 441,
        flex: 2,
    },
    progress: {
        flex: 1,
        position: "absolute",
        right: 0,
        top: 17,
    },
    wrap: {
        marginHorizontal: 35,
        marginVertical: 21,
    },
    headlineWrap: {},
    headline: {
        fontSize: 26,
        fontWeight: "bold",
        lineHeight: 33,
        marginBottom: 2,
        flex: 1,
    },
    headlineWrap: {
        flexDirection: "row",
    },
    content: {
        marginTop: 20,
        marginBottom: 20,
    },
    headline2: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#8B8A8E",
        lineHeight: 27,
        marginBottom: 15,
    },
    descSynopsis: {
        color: "#8B8A8E",
        fontSize: 14,
    },
    genre: {
        borderWidth: 0,
        backgroundColor: "#7E69CC",

        height: 21,
        width: 60,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        elevation: 2,
        marginRight: 8,
        marginBottom: 5,
    },
    chapter: {
        borderBottomWidth: 1,
        height: 23,
        marginBottom: 10,
        borderColor: "#8A898E",
    },
    detail: {
        borderWidth: 0,
        backgroundColor: "white",
        flex: 2,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
    },
});
