import { Pressable, StyleSheet, Text, View } from "react-native";

const SaveButton = ({ saveCurrentCocktail }) => {
    return (
        <View style={styles.SaveButton}>
            <Pressable onPress={saveCurrentCocktail}>
                <Text style={styles.text}>SAVE</Text>
            </Pressable>
        </View>
    );
};

export default SaveButton;

const styles = StyleSheet.create({
    SaveButton: {
        backgroundColor: "rgba(0, 255, 133, 0.3)",
        width: 60,
        height: 60,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 20,
        fontFamily: "MedievalSharp",
        color: "white",
    },
    text: {
        color: "white",
        fontSize: 20,
        fontFamily: "MedievalSharp",
    },
});
