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
import { useFonts } from "expo-font";
import { ingredientImages } from "./newCocktail";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";

import ice from "../assets/media/ice.png";
import wood from "../assets/media/wood.jpg";
import edit from "../assets/media/edit.png";
import pergamino from "../assets/media/pergamino.jpg";
import DescriptionModal from "../src/components/DescriptionModal";
import alcoholPortion from "../assets/media/alcohol.png";
import juicePortion from "../assets/media/juice.png";
import extraPortion from "../assets/media/extra.png";
import { AppContext } from "../src/context/AppContext";

const { width, height } = Dimensions.get("screen");

const Cocktail = ({ route }) => {
  const navigation = useNavigation();
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
            </View>
            <View style={{ borderRadius: 20, overflow: 'hidden', marginBottom: 60 }}>
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
                <View style={styles.buttons}>
                  <CloseButton goBack={() => navigation.navigate("Index")} />
                  <EditCocktail cocktail={cocktail} />
                </View>
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
      <View style={styles.editContainer}>
        <Image source={edit} style={styles.EditImage} />
      </View>
    </Pressable>
  );
};

const SeeCocktailIngredientList = ({
  ingredients,
  setIsModalOpen,
  setIngredientSelected,
}) => {
  return (
    <View style={styles.ingredientListContainer}>
      {ingredients.map((ingredient) => (
        <IngredientItem
          key={ingredient.ingredientCharacteristics.id}
          ingredient={ingredient}
          setIsModalOpen={setIsModalOpen}
          setIngredientSelected={setIngredientSelected}
        />
      ))}
    </View>
  );
};

const IngredientItem = ({
  ingredient,
  setIsModalOpen,
  setIngredientSelected,
}) => {
  const { contentLanguage } = useContext(AppContext);
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
            ingredient={ingredient}
            ingredientImage={ingredient.ingredientCharacteristics.ingredientType}
          />
        </View>
        <Text style={styles.Ingredient}>
          {ingredient.ingredientCharacteristics.ingredientName}
        </Text>
      </Pressable>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{ingredient.ingredientCharacteristics.ingredientType === "shake"
          ? "" : contentLanguage.quantity + ":"}</Text>
        {[...Array(ingredient.quantity)].map((_, i) => (
          <View key={i} style={styles.quantityItem}>
            <Image
              source={ingredient.ingredientCharacteristics.ingredientType === "ice"
                ? ice
                : ingredient.ingredientCharacteristics.ingredientType === "juice"
                  ? juicePortion
                  : ingredient.ingredientCharacteristics.ingredientType === "alcohol"
                    ? alcoholPortion
                    : ingredient.ingredientCharacteristics.ingredientType === "extra"
                      ? extraPortion
                      : null
              }
              style={styles.ImageIngredientQuantity}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const QuantityIngredient = ({ ingredientImage }) => {
  return (
    <View style={styles.QuantityIngredient}>
      <Image
        source={ingredientImages[ingredientImage]}
        style={styles.imgIngredient}
      />
    </View>
  );
};

const CloseButton = ({ goBack }) => {
  return (
    <Pressable onPress={goBack} style={styles.backButton}>
      <Text style={styles.textButton}>BACK</Text>
    </Pressable>
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
  textButton: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  cocktailItem: {
    borderRadius: 20,
    width: 200,
    height: 200,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  Image: {
    resizeMode: "contain",
    width: 140,
    height: 140,
  },
  IngredientText: {
    // marginTop: 6,
    color: "white",
    fontSize: 20,
    fontFamily: "MedievalSharp",
  },
  Ingredient: {
    color: "black",
    fontSize: 20,
    fontFamily: "MedievalSharp",
  },
  IngredientOnList: {
    width: width / 1.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
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
    justifyContent: "center",
    alignItems: "center",
    marginTop: '15%',
  },
  EditImage: {
    padding: 10,
    resizeMode: "contain",
    width: 60,
    height: 60,
  },
  editContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
  },
  ImageIngredientQuantity: {
    resizeMode: "contain",
    width: 20,
    height: 20,
  },
  imgIngredient: {
    resizeMode: "contain",
    width: 40,
    height: 40,
  },
  quantityContainer: {
    alignItems: "center",
    flexDirection: "row",
    // backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderRadius: 20,
    padding: 5,
    margin: 5,
  },
  quantityItem: {
    // backgroundColor: "rgba(0, 0, 0, 0.6)",
    marginLeft: 5,
  },
  quantityText: {
    fontSize: 12,
    fontFamily: "MedievalSharp",
  },
  buttons: {
    marginBottom: 60,
    width: width,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backButton: {
    backgroundColor: "rgba(161, 152, 152, 0.5)",
    height: 60,
    width: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "MedievalSharp",
    color: "white",
  },
  ingredientListContainer: {
    marginBottom: 20,
  },
});
