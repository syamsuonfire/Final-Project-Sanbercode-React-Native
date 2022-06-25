import { View, Image, TouchableOpacity } from "react-native";

export default function MovieCard({ movie, onPressMovie }) {
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity onPress={onPressMovie}>
                <Image
                    style={{
                        width: 150,
                        height: 200,
                        margin: 10,
                        borderRadius: 10,
                    }}
                    source={{ uri: movie.Poster }}
                />
            </TouchableOpacity>
        </View>
    );
}
