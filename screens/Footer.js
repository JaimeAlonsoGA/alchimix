import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

import cocktails from "../assets/media/cocktails.png";
import ingredients from "../assets/media/ingredients.png";
import plus from "../assets/media/plus.png";

const { width, height } = Dimensions.get("screen");

const FooterApp = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.FooterApp}>
      <Pressable onPress={() => navigation.navigate("Index")}>
        <Image source={cocktails} style={styles.Image} />
      </Pressable>
      <Pressable
        onPress={() =>
          navigation.navigate("Addcoctel", {
            valueId: null,
            valueGlass: plus,
            valueDescription: null,
            valueName: null,
            valueIngredients: [],
          })
        }
      >
        <Image source={plus} style={styles.Image} />
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Ingredients")}>
        <Image source={ingredients} style={styles.Image} />
      </Pressable>
    </View>
  );
};

export default FooterApp;

const styles = StyleSheet.create({
  FooterApp: {
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    width: width,
    // backgroundColor: "rgba(217, 217, 217, 0.5)",
    height: 100,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  Image: {
    resizeMode: "contain",
    width: 60,
    height: 60,
    marginBottom: 10,
  },
});
