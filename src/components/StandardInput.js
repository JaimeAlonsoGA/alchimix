import { Dimensions, StyleSheet, Text, TextInput } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("screen");

export const StandardInputForm = ({ value, ...props }) => {
  return (
    <TextInput
      value={value}
      {...props}
      placeholder="Name"
      style={styles.CocktailName}
    />
  );
};

export const StandardInputDescription = ({ value, ...props }) => {
  return (
    <TextInput
      multiline
      numberOfLines={20}
      value={value}
      {...props}
      placeholder="Add here a description..."
      style={[styles.CocktailDescription, styles.textInput, { height: 150 }]}
    />
  );
};

export const StandardInputAlcohol = (props) => {
  return (
    <TextInput
      inputMode="decimal"
      {...props}
      style={[
        styles.CocktailAlcohol,
        styles.textInput,
        { width: 40, textAlign: "center" },
      ]}
    />
  );
};

export default StandardInputForm;

const styles = StyleSheet.create({
  CocktailName: {
    marginTop: 10,
    backgroundColor: "rgba(161, 152, 152, 0.1)",
    width: width / 1.1,
    height: 50,
    marginVertical: 5,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "MedievalSharp",
    color: "white",
  },
  CocktailDescription: {
    backgroundColor: "rgba(161, 152, 152, 0.1)",
    width: width / 1.1,
    height: 30,
    marginVertical: 15,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    color: "#F3E8E6",
  },
  CocktailAlcohol: {
    backgroundColor: "rgba(161, 152, 152, 0.1)",
    width: width / 1.1,
    height: 30,
    marginVertical: 20,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  Ingredient: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  textInput: {
    // color: "#facb22",
    fontSize: 16,
    fontFamily: "MedievalSharp",
  },
});
