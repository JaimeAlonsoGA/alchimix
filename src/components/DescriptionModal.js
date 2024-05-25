import {
  Dimensions,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
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
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalOpen}
      onRequestClose={() => {
        setIsModalOpen(false);
      }}
    >
      <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              {isCocktailIngredient && (
                <Edit
                  ingredientSelected={ingredientSelected}
                  setIsModalOpen={setIsModalOpen}
                />
              )}
              <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={[styles.text, { color: "red" }]}>
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
              {/* <CloseButton setIsModalOpen={setIsModalOpen} /> */}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
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
      <Text style={[styles.textClose, { color: "white" }]}>BACK</Text>
    </View>
  </TouchableOpacity>
);

export default DescriptionModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(90, 60, 40, 0.6)",
  },
  DescriptionModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    marginTop: 20,
    backgroundColor: "rgba(190, 190, 190, 1)",
    width: width / 1.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 140,
    padding: 18,
    overflow: "hidden",
    opacity: 0.8,
  },
  closeButton: {
    backgroundColor: "rgba(161, 152, 152, 0.5)",
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "MedievalSharp",
    color: "white",
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
    width: 55,
    height: 55,
  },
  editContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: '20%',
  },
  alcoholStrength: {
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
});
