import { Pressable, StyleSheet, Text } from "react-native";

const NewIngredient = ({ addNewIngredient }) => {
    return (
        <Pressable
            onPress={addNewIngredient}
            style={styles.AddSpice}
        >
            <Text style={[styles.text, { fontSize: 18 }]}>ADD</Text>
        </Pressable>
    );
};

export default NewIngredient;

const styles = StyleSheet.create({
    AddSpice: {
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
