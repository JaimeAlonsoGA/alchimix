import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { useFonts } from "expo-font";
import edit from "../../assets/media/edit.png";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const DescriptionModal = ({
  isModalOpen,
  setIsModalOpen,
  ingredientSelected,
  isCocktailIngredient,
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

  console.log(ingredientSelected);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalOpen}
        onRequestClose={!isModalOpen}
      >
        <View style={styles.DescriptionModal}>
          <View style={styles.modalContent}>
            {isCocktailIngredient && (
              <Edit
                ingredientSelected={ingredientSelected}
                setIsModalOpen={setIsModalOpen}
              />
            )}
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.text, { color: "red", marginTop: 40 }]}>
                {ingredientSelected.ingredientName}
              </Text>
              {ingredientSelected.ingredientType === "alcohol" && (
                <Text style={styles.alcoholStrength}>
                  [{ingredientSelected.alcoholStrength} %]
                </Text>
              )}
              <Text style={styles.textText}>
                {ingredientSelected.description}
              </Text>
            </ScrollView>
            <CloseButton setIsModalOpen={setIsModalOpen} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const Edit = ({ ingredientSelected, setIsModalOpen }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.editContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("NewIngredient", {
            valueDescription: ingredientSelected.description,
            valueName: ingredientSelected.ingredientName,
            valueAlcohol: ingredientSelected.alcoholStrength,
            valueType: ingredientSelected.ingredientType,
            valueId: ingredientSelected.id,
          });
          setIsModalOpen(false);
        }}
      >
        <Image source={edit} style={styles.edit} />
      </Pressable>
    </View>
  );
};

const CloseButton = ({ setIsModalOpen }) => (
  <TouchableOpacity onPress={() => setIsModalOpen(false)}>
    <View style={styles.closeButton}>
      <Text style={[styles.textClose, { color: "white" }]}>go back</Text>
    </View>
  </TouchableOpacity>
);

export default DescriptionModal;

const styles = StyleSheet.create({
  DescriptionModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(92, 65, 50, 0.5)",
  },
  modalContent: {
    marginTop: 20,
    backgroundColor: "rgba(240, 243, 255, 1)",
    width: width / 1.2,
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 200,
    padding: 18,
    overflow: "hidden",
    opacity: 0.8,
  },
  closeButton: {
    margin: 2,
    borderWidth: 2,
    borderColor: "#eeb51e",
    backgroundColor: "rgba(255, 21, 21, 0.9)",
    borderRadius: 100,
    padding: 2,
  },
  textClose: {
    padding: 10,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  text: {
    fontSize: 30,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  textText: {
    marginVertical: 20,
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  edit: {
    resizeMode: "contain",
    width: 60,
    height: 60,
  },
  editContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  alcoholStrength: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
});
