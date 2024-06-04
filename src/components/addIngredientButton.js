import { Pressable, StyleSheet, Text } from "react-native";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const NewIngredient = ({ addNewIngredient }) => {
    const { contentLanguage } = useContext(AppContext);

    return (
        <Pressable
            onPress={addNewIngredient}
            style={styles.AddSpice}
        >
            <Text style={[styles.text, { fontSize: 18 }]}>{contentLanguage.addButton}</Text>
        </Pressable>
    );
};

export default NewIngredient;

const styles = StyleSheet.create({
    AddSpice: {
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
