import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { AppContext } from "../src/context/AppContext";

import wood from "../assets/media/wood.jpg";
import FooterApp from "./Footer";
import alcohol from "../assets/media/alcohol.png";
import juice from "../assets/media/juice.png";
import extra from "../assets/media/extra.png";
import ice from "../assets/media/ice.png";
import shake from "../assets/media/shake.png";
import alcoholType from "../assets/media/alcoholType.png";
import extraType from "../assets/media/extraType.png";
import juiceType from "../assets/media/juiceType.png";
import mantel from "../assets/media/mantel.png";

import { getCachedData, removeCachedData } from "../saveData";
import DescriptionModal from "../src/components/DescriptionModal";
// import defaultIngredients from "../src/defaultIngredients";

const { width, height } = Dimensions.get("screen");

const Ingredients = () => {
  const [pressed, setPressed] = useState({
    alcohol: true,
    extra: false,
    juice: false,
    ice: false,
    shake: false,
  });

  const [typeIngredientSelected, setTypeIngredientSelected] =
    useState("alcohol");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientSelected, setIngredientSelected] = useState({});

  const [fontsLoaded, fontError] = useFonts({
    MedievalSharp: require("../assets/fonts/MedievalSharp.ttf"),
  });

  if (fontError) {
    console.error(fontError);
    return <Text>Error loading font</Text>;
  }

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  const isCocktailIngredient = true;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wood}
        resizeMode="cover"
        style={styles.ImageBackground}
      >
        <View style={styles.backgroundColor}>
          <View style={{ position: "absolute", top: '50%' }}>
            <Image
              source={mantel}
              style={{
                resizeMode: "contain",
                width: width,
                height: height,
                opacity: 0.5,
              }}
            />
          </View>
          <Header
            pressed={pressed}
            setPressed={setPressed}
            setTypeIngredientSelected={setTypeIngredientSelected}
          />
          <IngredientList
            pressed={pressed}
            setIsModalOpen={setIsModalOpen}
            setIngredientSelected={setIngredientSelected}
            typeIngredientSelected={typeIngredientSelected}
          />
          <DescriptionModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            ingredientSelected={ingredientSelected}
            isCocktailIngredient={isCocktailIngredient}
          />
          <FooterApp typeIngredientSelected={typeIngredientSelected} />
        </View>
      </ImageBackground>
    </View>
  );
};

const Header = ({ pressed, setPressed, setTypeIngredientSelected }) => {
  const handlePress = (name) => {
    setPressed({
      alcohol: false,
      extra: false,
      juice: false,
      ice: false,
      shake: false,
      [name]: true,
    });
    setTypeIngredientSelected(name);
  };

  return (
    <>
      <View style={styles.Header}>
        <ScrollView horizontal={true}>
          <Pressable
            onPress={() => handlePress("alcohol")}
            style={pressed.alcohol ? styles.Pressed : {}}
          >
            <Image source={alcoholType} style={styles.IngredientType} />
          </Pressable>
          <Pressable
            onPress={() => handlePress("extra")}
            style={pressed.extra ? styles.Pressed : {}}
          >
            <Image source={extraType} style={styles.IngredientType} />
          </Pressable>
          <Pressable
            onPress={() => handlePress("juice")}
            style={pressed.juice ? styles.Pressed : {}}
          >
            <Image source={juiceType} style={styles.IngredientType} />
          </Pressable>
          <Pressable
            onPress={() => handlePress("ice")}
            style={pressed.ice ? styles.Pressed : {}}
          >
            <Image
              source={ice}
              style={[styles.IngredientType, { width: 80, height: 80 }]}
            />
          </Pressable>
          <Pressable
            onPress={() => handlePress("shake")}
            style={pressed.shake ? styles.Pressed : {}}
          >
            <Image
              source={shake}
              style={[styles.IngredientType, { width: 90, height: 90 }]}
            />
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
};

const IngredientList = ({
  pressed,
  setIsModalOpen,
  setIngredientSelected,
  typeIngredientSelected,
}) => {
  const { ingredients } = useContext(AppContext);
  return (
    <View style={styles.IngredientList}>
      <ScrollView>
        {ingredients.map((ingredient, i) => {
          if (ingredient.ingredientType === typeIngredientSelected) {
            return (
              <IngredientItem
                ingredient={ingredient}
                key={i}
                pressed={pressed}
                setIsModalOpen={setIsModalOpen}
                setIngredientSelected={setIngredientSelected}
              />
            );
          }
        })}
      </ScrollView>
    </View>
  );
};

const IngredientItem = ({
  ingredient,
  pressed,
  setIsModalOpen,
  setIngredientSelected,
}) => (
  <>
    <TouchableOpacity
      onPress={() => {
        setIngredientSelected(ingredient);
        setIsModalOpen(true);
      }}
      style={styles.SpiceItem}
    >
      <Text style={styles.SpiceItemText}>{ingredient.ingredientName}</Text>
      {pressed.alcohol && (
        <Text style={styles.SpiceItemText}>{ingredient.alcoholStrength} %</Text>
      )}
    </TouchableOpacity>
  </>
);

export default Ingredients;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  ImageBackground: {
    flex: 1,
    width: width,
    height: height,
  },
  backgroundColor: {
    backgroundColor: "rgba(92, 65, 50, 0.6)",
    width: width,
    height: height,
    alignItems: "center",
  },
  Header: {
    borderRadius: 20,
    marginTop: 50,
    height: 120,
    width: width / 1.1,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    // alignItems: "center",
    // alignContent: 'center',
    // justifyContent: "center",
    flexDirection: "row",
    marginBottom: 50,
  },
  Pressed: {
    borderRadius: 20,
    backgroundColor: "rgba(218, 25, 25, 0.38)",
    // borderRadius: 4,
    // borderColor: "black",
    // borderWidth: 2,
    margin: 2,
  },
  text: {
    color: "white",
    fontFamily: "MedievalSharp",
  },
  SpiceItem: {
    borderRadius: 20,
    width: width / 1.4,
    height: 50,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    // borderWidth: 4,
    // borderColor: "black",
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SpiceItemText: {
    marginHorizontal: 20,
    fontSize: 18,
    color: "white",
    fontFamily: "MedievalSharp",
  },
  IngredientType: {
    alignItems: "center",
    resizeMode: "contain",
    width: 80,
    height: 80,
    margin: 15,
  },
  IngredientList: {
    height: 350,
  },
});
