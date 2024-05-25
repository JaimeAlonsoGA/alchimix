import {
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { useFonts } from "expo-font";

import ice from "../../assets/media/ice.png";
import shake from "../../assets/media/shake.png";
import alcoholType from "../../assets/media/alcoholType.png";
import extraType from "../../assets/media/extraType.png";
import juiceType from "../../assets/media/juiceType.png";
import { AppContext } from "../context/AppContext";
import wood from "../../assets/media/wood.jpg";

const { width, height } = Dimensions.get("screen");

// const ingredientTypeLogo = (selectedType) => {
//   switch (selectedType) {
//     case "ice":
//       return ice;
//     case "shake":
//       return shake;
//     case "alcohol":
//       return alcoholType;
//     case "extra":
//       return extraType;
//     case "juice":
//       return juiceType;
//     default:
//       return null;
//   }
// };

// const ingredientTypeIcon = {
//   ice,
//   shake,
//   alcoholType,
//   extraType,
//   juiceType,
// };

const AddCocktailIngredientModal = ({
  setCocktailIngredient,
  pressed,
  handlePress,
  modalOpen,
  setModalOpen,
  selectedType,
  scrollToItem,
}) => {
  const [fontsLoaded, fontError] = useFonts({
    MedievalSharp: require("../../assets/fonts/MedievalSharp.ttf"),
  });

  if (fontError) {
    console.error(fontError);
    return <Text>Error loading font</Text>;
  }

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  // useEffect(() => {
  //   console.log(ingredientTypeLogo[selectedType]);
  // }, [selectedType]);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalOpen}
      onRequestClose={!modalOpen}
    >
      <View style={styles.container}>
        <ImageBackground
          source={wood}
          resizeMode="cover"
          style={styles.ImageBackground}
        >
          <View style={styles.backgroundColor}>
            <View style={styles.SpicesModal}>
              {/* <Image source={ingredientTypeIcon[selectedType]} style={styles.selectedTypeImg} /> */}
              <View>
                <Ingredients
                  setCocktailIngredient={setCocktailIngredient}
                  setModalOpen={setModalOpen}
                  handlePress={handlePress}
                  pressed={pressed}
                  selectedType={selectedType}
                  scrollToItem={scrollToItem}
                />
              </View>
              <CloseModal
                setModalOpen={setModalOpen}
                handlePress={handlePress}
                selectedType={selectedType}
              />
            </View>
          </View>
        </ImageBackground>
      </View >
    </Modal>
  );
};

const Ingredients = ({
  setCocktailIngredient,
  pressed,
  setModalOpen,
  handlePress,
  selectedType,
  scrollToItem,
}) => {
  const { ingredients } = useContext(AppContext);
  return (
    <View style={styles.SpiceMap}>
      <ScrollView>
        {ingredients
          .filter((ingredient) => ingredient.ingredientType === selectedType)
          .map((ingredient, i) => {
            return (
              <IngredientItem
                key={i}
                setCocktailIngredient={setCocktailIngredient}
                ingredient={ingredient}
                setModalOpen={setModalOpen}
                handlePress={handlePress}
                pressed={pressed}
                scrollToItem={scrollToItem}
              />
            );
          })}
      </ScrollView>
    </View>
  );
};

const IngredientItem = ({
  setCocktailIngredient,
  ingredient,
  setModalOpen,
  handlePress,
  pressed,
  scrollToItem,
}) => (
  <Pressable
    onPress={() => {
      setCocktailIngredient((prevIngredients) => [
        ...prevIngredients,
        { ingredientCharacteristics: ingredient, quantity: 1 },
      ]);
      handlePress(ingredient.ingredientType);
      setModalOpen(false);
      scrollToItem();
    }}
    style={styles.ingredientButton}
  >
    <View style={styles.SpiceItem}>
      <Text style={styles.SpiceItemText}>{ingredient.ingredientName}</Text>
      {pressed.alcohol && (
        <Text style={styles.SpiceItemText}>{ingredient.alcoholStrength} %</Text>
      )}
    </View>
    <Text style={styles.SpiceItemTextDescription}>{ingredient.description}</Text>
  </Pressable>
);

const CloseModal = ({ setModalOpen, handlePress, selectedType }) => {
  return (
    <Pressable
      onPress={() => {
        handlePress(selectedType);
        setModalOpen(false);
      }}
      style={[styles.button, { justifyContent: "center", alignItems: "center" }]}
    >
      <View style={styles.CloseModal}>
        <Text style={styles.text}>CLOSE</Text>
      </View>
    </Pressable>
  );
};

export default AddCocktailIngredientModal;

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
  SpicesModal: {
    flex: 1,
    // justifyContent: "center",
    borderRadius: 20,
  },
  SpiceMap: {
    marginTop: 150,
    alignItems: "center",
    height: 400,
  },
  SpiceItem: {
    width: width / 1.1,
    height: 50,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    // borderWidth: 4,
    // borderColor: "black",
    borderRadius: 20,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectedTypeImg: {
    resizeMode: "contain",
    width: 20,
    height: 20,
  },
  ingredientButton: {
    marginVertical: 10,
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  SpiceItemText: {
    marginHorizontal: 20,
    fontSize: 15,
    color: "white",
    fontFamily: "MedievalSharp",
  },
  SpiceItemTextDescription: {
    marginHorizontal: 20,
    fontSize: 10,
    color: "white",
    fontFamily: "MedievalSharp",
    textAlign: "center",
    fontSize: 12,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  CloseModal: {
    backgroundColor: "rgba(255, 21, 21, 0.3)",
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
  button: {
    width: width,
    height: '25%',
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
