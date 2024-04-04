import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useFonts } from "expo-font";

import ice from "../../assets/media/ice.png";
import shake from "../../assets/media/shake.png";
import alcoholType from "../../assets/media/alcoholType.png";
import extraType from "../../assets/media/extraType.png";
import juiceType from "../../assets/media/juiceType.png";
import { AppContext } from "../context/AppContext";

const { width, height } = Dimensions.get("screen");

// const ingredientTypeLogo = {
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

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={!modalOpen}
      >
        {/* <Image source={ingredientTypeLogo[selectedType]} /> */}
        <View style={styles.SpicesModal}>
          <CloseModal
            setModalOpen={setModalOpen}
            handlePress={handlePress}
            selectedType={selectedType}
          />
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
        </View>
      </Modal>
    </View>
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
  const {ingredients} = useContext(AppContext);
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
  >
    <View style={styles.SpiceItem}>
      <Text style={styles.SpiceItemText}>{ingredient.ingredientName}</Text>
      {pressed.alcohol && (
        <Text style={styles.SpiceItemText}>{ingredient.alcoholStrength} %</Text>
      )}
    </View>
  </Pressable>
);

const CloseModal = ({ setModalOpen, handlePress, selectedType }) => {
  return (
    <Pressable
      onPress={() => {
        handlePress(selectedType);
        setModalOpen(false);
      }}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View style={styles.CloseModal}>
        <Text style={styles.text}>CLOSE</Text>
      </View>
    </Pressable>
  );
};

export default AddCocktailIngredientModal;

const styles = StyleSheet.create({
  SpicesModal: {
    flex: 1,
    // justifyContent: "center",
    backgroundColor: "rgba(92, 65, 50, 0.9)",
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
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  SpiceItemText: {
    marginHorizontal: 20,
    fontSize: 15,
    color: "white",
    fontFamily: "MedievalSharp",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  CloseModal: {
    position: "absolute",
    top: 590,
    alignContent: "center",
    width: width / 1.2,
    height: 50,
    backgroundColor: "rgba(255, 21, 21, 0.7)",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
  },
});
