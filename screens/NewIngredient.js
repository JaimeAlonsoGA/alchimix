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
import { useNavigation } from "@react-navigation/native";
import { useNewIngredient } from "../src/hooks/useNewIngredient";

import alcoholType from "../assets/media/alcoholType.png";
import extraType from "../assets/media/extraType.png";
import juiceType from "../assets/media/juiceType.png";
import ice from "../assets/media/ice.png";
import shake from "../assets/media/shake.png";
import mantel from "../assets/media/mantel.png";

import {
  FormFieldName,
  FormFieldAlcohol,
  FormFieldDescription,
} from "../src/components/FormFields";
import {
  StandardInputAlcohol,
  StandardInputDescription,
  StandardInputForm,
} from "../src/components/StandardInput";

const { width, height } = Dimensions.get("screen");

const NewIngredient = ({ route }) => {
  const {
    valueDescription = "",
    valueName = "",
    valueAlcohol = "",
    valueType = "",
    valueId = null,
  } = route.params;

  const isEditing = valueId !== null;

  const {
    setIngredientType,
    ingredientName,
    setIngredientName,
    alcoholStrength,
    setAlcoholStrength,
    description,
    setDescription,
    saveCurrentIngredient,
    deleteCurrentIngredient,
  } = useNewIngredient(
    valueId,
    valueName,
    valueDescription,
    valueType,
    valueAlcohol
  );

  const navigation = useNavigation();
  const [typeOfIngredientToEdit, setTypeOfIngredientToEdit] =
    useState("alcohol");
  const [pressed, setPressed] = useState({
    alcohol: false,
    extra: false,
    juice: false,
    ice: false,
    shake: false,
    [typeOfIngredientToEdit]: true,
  });

  const handlePress = (name) => {
    setPressed({
      alcohol: false,
      extra: false,
      juice: false,
      ice: false,
      shake: false,
      [name]: true,
    });
    setIngredientType(name);
  };

  useEffect(() => {
    if (valueType) {
      setTypeOfIngredientToEdit(valueType);
      setPressed({
        alcohol: false,
        extra: false,
        juice: false,
        ice: false,
        shake: false,
        [valueType]: true,
      });
    }
  }, [valueType]);

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

  let text;
  if (pressed.alcohol) {
    text = "Licor Name*";
  } else if (pressed.extra) {
    text = "Spice Name*";
  } else if (pressed.ice) {
    text = "Ice Type*";
  } else if (pressed.juice) {
    text = "Juice Name*";
  } else if (pressed.shake) {
    text = "Shake Technique*";
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wood}
        resizeMode="cover"
        style={styles.ImageBackground}
      >
        <View style={styles.backgroundColor}>
          <View style={{ position: "absolute", marginTop: 490 }}>
            <Image
              source={mantel}
              style={{
                resizeMode: "contain",
                width: 400,
                height: 400,
                opacity: 0.2,
              }}
            />
          </View>
          <ScrollView>
            {/* <FooterApp /> */}
            <ChooseIngredientType
              pressed={pressed}
              setPressed={setPressed}
              handlePress={handlePress}
            />
            <View style={{ height: height * 1.01 }}>
              <FormFieldName
                valueName={ingredientName}
                text={text}
                setter={setIngredientName}
                StandardInputForm={StandardInputForm}
              />
              {pressed.alcohol && (
                <FormFieldAlcohol
                  text={"Alcohol Strength"}
                  setter={setAlcoholStrength}
                  valueAlcohol={alcoholStrength}
                  StandardInputAlcohol={StandardInputAlcohol}
                />
              )}
              <FormFieldDescription
                text={"Description"}
                setter={setDescription}
                valueDescription={description}
                StandardInputDescription={StandardInputDescription}
              />
            </View>
          </ScrollView>
          <SaveButton
            saveCurrentIngredient={async () => {
              await saveCurrentIngredient();
              navigation.navigate("Ingredients");
            }}
          />
          {isEditing && (
            <DeleteButton
              deleteCurrentIngredient={async () => {
                await deleteCurrentIngredient();
                navigation.navigate("Ingredients");
              }}
            />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

const SaveButton = ({ saveCurrentIngredient }) => {
  return (
    <Pressable onPress={saveCurrentIngredient} style={styles.SaveButton}>
      <Text style={styles.text}>SAVE</Text>
    </Pressable>
  );
};

const DeleteButton = ({ deleteCurrentIngredient }) => {
  return (
    <Pressable onPress={deleteCurrentIngredient} style={styles.DeleteButton}>
      <Text style={styles.text}>DELETE</Text>
    </Pressable>
  );
};

const ChooseIngredientType = ({ pressed, handlePress }) => {
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
            <Image source={ice} style={styles.IngredientType} />
          </Pressable>
          <Pressable
            onPress={() => handlePress("shake")}
            style={pressed.shake ? styles.Pressed : {}}
          >
            <Image source={shake} style={styles.IngredientType} />
          </Pressable>
        </ScrollView>
      </View>
    </>
  );
};

export default NewIngredient;

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
    backgroundColor: "rgba(92, 65, 50, 0.8)",
    width: width,
    height: height,
    alignItems: "center",
  },
  Header: {
    marginTop: 50,
    height: 120,
    width: width / 1.1,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-evenly",
    marginBottom: 40,
  },
  Pressed: {
    backgroundColor: "rgba(218, 25, 25, 0.38)",
    // borderRadius: 4,
    // borderColor: "black",
    // borderWidth: 2,
    // padding: 5,
    margin: 2,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  SaveButton: {
    position: "absolute",
    bottom: 50,
    alignContent: "center",
    width: width / 1.1,
    height: 50,
    backgroundColor: "rgba(255, 21, 21, 0.7)",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
  },
  DeleteButton: {
    position: "absolute",
    bottom: 115,
    alignContent: "center",
    width: width / 1.6,
    height: 50,
    backgroundColor: "rgba(255, 21, 21, 0.7)",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
  },
  IngredientType: {
    resizeMode: "contain",
    width: 80,
    height: 80,
    margin: 15,
  },
});
