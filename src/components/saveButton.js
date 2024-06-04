import { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AppContext } from "../context/AppContext";

const SaveButton = ({ saveCurrentCocktail }) => {
    const { contentLanguage } = useContext(AppContext);
    return (
        <View style={styles.SaveButton}>
            <Pressable onPress={saveCurrentCocktail}>
                <Text style={styles.text}>{contentLanguage.saveButton}</Text>
            </Pressable>
        </View>
    );
};

export default SaveButton;

const styles = StyleSheet.create({
    SaveButton: {
        backgroundColor: "rgba(0, 255, 133, 0.3)",
        minWidth: 60,
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
