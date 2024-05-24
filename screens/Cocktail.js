import {
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import wood from "../assets/media/wood.jpg";
import { useFonts } from "expo-font";
import { ingredientImages } from "./newCocktail";
import { useNavigation } from "@react-navigation/native";
import edit from "../assets/media/edit.png";
import pergamino from "../assets/media/pergamino.jpg";
import DescriptionModal from "../src/components/DescriptionModal";

const { width, height } = Dimensions.get("screen");

const Cocktail = ({ route }) => {
  const { cocktail } = route.params;

  useFonts({
    MedievalSharp: require("../assets/fonts/MedievalSharp.ttf"),
  });

  useEffect(() => {
    console.log("cocktail seleccionado: ", cocktail);
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredientSelected, setIngredientSelected] = useState({});

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wood}
        resizeMode="cover"
        style={styles.ImageBackground}
      >
        <View style={styles.backgroundColor}>
          <ScrollView>
            <View style={styles.Header}>
              <View style={styles.cocktailItem}>
                <Image source={cocktail.glass} style={styles.Image} />
              </View>
              <EditCocktail cocktail={cocktail} />
            </View>
            <View style={{ borderRadius: 20, overflow: 'hidden' }}>
              <ImageBackground
                source={pergamino}
                style={{ flex: 1 }}
              >
                <Text style={styles.text}>{cocktail.cocktailName}</Text>
                <View style={styles.description}>
                  <Text style={styles.descriptionText}>
                    {cocktail.description}
                  </Text>
                </View>
                <SeeCocktailIngredientList
                  ingredients={cocktail.cocktailIngredients}
                  setIngredientSelected={setIngredientSelected}
                  setIsModalOpen={setIsModalOpen}
                />
                <DescriptionModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  ingredientSelected={ingredientSelected}
                />
              </ImageBackground>
            </View>
          </ScrollView>
        </View>
      </ImageBackground>
    </View>
  );
};

const EditCocktail = ({ cocktail }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Addcoctel", {
          valueGlass: cocktail.glass,
          valueName: cocktail.cocktailName,
          valueDescription: cocktail.description,
          valueIngredients: cocktail.cocktailIngredients,
          valueId: cocktail.id,
        })
      }
    >
      <Image source={edit} style={styles.EditImage} />
    </Pressable>
  );
};

const SeeCocktailIngredientList = ({
  ingredients,
  setIsModalOpen,
  setIngredientSelected,
}) => {
  return (
    <>
      {ingredients.map((ingredient, i) => (
        <IngredientItem
          ingredient={ingredient}
          key={i}
          setIsModalOpen={setIsModalOpen}
          setIngredientSelected={setIngredientSelected}
        />
      ))}
    </>
  );
};

const IngredientItem = ({
  ingredient,
  setIsModalOpen,
  setIngredientSelected,
}) => {
  return (
    <View>
      <Pressable
        onPress={() => {
          setIsModalOpen(true);
          setIngredientSelected(ingredient.ingredientCharacteristics);
        }}
        style={styles.IngredientOnList}
      >
        <View style={{ flex: 1 }}>
          <QuantityIngredient
            ingredientImage={
              ingredient.ingredientCharacteristics.ingredientType
            }
            quantity={ingredient.quantity}
          />
        </View>
        <View style={{ flexDirection: "column" }}>
          <Text style={styles.Ingredient}>
            {ingredient.ingredientCharacteristics.ingredientName}
          </Text>
          <Text style={[styles.Ingredient, { fontSize: 10 }]}>
            {ingredient.ingredientCharacteristics.description}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const QuantityIngredient = ({ ingredientImage, quantity }) => {
  return (
    <View style={styles.QuantityIngredient}>
      {[...Array(quantity)].map((_, i) => (
        <Image
          key={i}
          source={ingredientImages[ingredientImage]}
          style={styles.ImageIngredientQuantity}
        />
      ))}
    </View>
  );
};

export default Cocktail;

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
    justifyContent: 'center',
  },
  text: {
    marginTop: 25,
    color: "black",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  cocktailItem: {
    borderRadius: 20,
    width: 160,
    height: 160,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "column",
  },
  Image: {
    marginTop: 15,
    resizeMode: "contain",
    width: 60,
    height: 120,
    position: "absolute",
  },
  IngredientText: {
    // marginTop: 6,
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  Ingredient: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  IngredientOnList: {
    width: width / 1.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  QuantityIngredient: {
    flexDirection: "row",
  },
  descriptionText: {
    color: "black",
    textAlign: "center",
    padding: 10,
    marginBottom: 20,
    fontFamily: "MedievalSharp",
    fontSize: 16,
  },
  Header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: '5%',
  },
  EditImage: {
    resizeMode: "contain",
    width: 80,
    height: 80,
    marginLeft: 60,
  },
  ImageIngredientQuantity: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },

  pergamino: {
    position: "absolute",
    resizeMode: "center",
    width: 500,
    height: 500,
  },
});
