import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import cocktails from "../assets/media/cocktails.png";
import ingredients from "../assets/media/ingredients.png";
import plus from "../assets/media/plus.png";
import SaveButton from "../src/components/saveButton";
import { useNewCocktail } from "../src/hooks/useNewCocktail";
import { AppContext } from "../src/context/AppContext";
import NewIngredient from "../src/components/addIngredientButton";

const { width, height } = Dimensions.get("screen");

const FooterApp = ({ typeIngredientSelected, saveCurrentCocktail }) => {
  const navigation = useNavigation();
  const { currentScreen, setCurrentScreen } = useContext(AppContext);

  const saveCocktail = async () => {
    await saveCurrentCocktail();
    navigation.navigate("Index");
    setCurrentScreen("Index");
  };

  return (
    <View style={styles.FooterApp}>
      <Pressable
        onPress={() => { navigation.navigate("Index"); setCurrentScreen("Index") }}>
        <Image source={cocktails} style={styles.Image} />
      </Pressable>
      <Pressable
        onPress={() => {
          setCurrentScreen("Addcoctel");
          navigation.navigate("Addcoctel", {
            valueId: null,
            valueGlass: plus,
            valueDescription: null,
            valueName: null,
            valueIngredients: [],
          });
        }}
      >
        {currentScreen === "Addcoctel" ? <SaveButton
          saveCurrentCocktail={saveCocktail}
        /> : <Image source={plus} style={styles.Image} />}
      </Pressable>

      <Pressable
        onPress={() => {
          saveCurrentCocktail;
          navigation.navigate("Ingredients");
          setCurrentScreen("Ingredients")
        }}>
        {currentScreen === "Ingredients" ? <NewIngredient
          addNewIngredient={() => {
            navigation.navigate("NewIngredient", {
              valueDescription: null,
              valueName: null,
              valueAlcohol: null,
              valueType: typeIngredientSelected,
            })
          }}
        /> : <Image source={ingredients} style={styles.Image} />}
      </Pressable>
    </View >
  );
};

export default FooterApp;

const styles = StyleSheet.create({
  FooterApp: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: width,
    // backgroundColor: "rgba(217, 217, 217, 0.5)",
    height: '13%',
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: '3%',
  },
  Image: {
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 10,
    resizeMode: "contain",
    width: 60,
    height: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
});
