import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../src/context/AppContext";

import cocktails from "../assets/media/cocktails.png";
import ingredients from "../assets/media/ingredients.png";
import plus from "../assets/media/plus.png";
import SaveButton from "../src/components/saveButton";
import NewIngredient from "../src/components/addIngredientButton";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const FooterApp = ({ typeIngredientSelected, saveCurrentCocktail, isEditing, deleteCurrentCocktail }) => {
  const navigation = useNavigation();
  const { currentScreen, setCurrentScreen } = useContext(AppContext);
  const insets = useSafeAreaInsets();

  const saveCocktail = async () => {
    await saveCurrentCocktail();
    navigation.navigate("Index");
    setCurrentScreen("Index");
  };

  const deleteCocktail = async () => {
    await deleteCurrentCocktail();
    navigation.navigate("Index");
    setCurrentScreen("Index");
  };

  return (
    <View style={styles.footerContainer}>
      <View style={[styles.footer, {
        paddingLeft: insets.left,
        paddingRight: insets.right,
        paddingBottom: insets.bottom, 
        bottom: insets.bottom,
      }]}>
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
          /> : (isEditing ? <DeleteButton deleteCocktail={deleteCocktail} />
            : <Image source={ingredients} style={styles.Image} />)}
        </Pressable>
      </View>
    </View >
  );
};

const DeleteButton = ({ deleteCocktail }) => {
  return (
    <Pressable onPress={deleteCocktail} style={styles.DeleteButton}>
      <Text style={styles.text}>DELETE</Text>
    </Pressable>
  );
};

export default FooterApp;

const styles = StyleSheet.create({
  footerContainer: {
    width: width,
    position: "absolute",
    bottom: '10%',
  },
  footer: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginBottom: 45,
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
  DeleteButton: {
    backgroundColor: "rgba(255, 21, 21, 0.3)",
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
    fontSize: 18,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
});
