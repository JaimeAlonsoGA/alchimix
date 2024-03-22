import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import wood from "../assets/media/wood.jpg";

import cocktail from "../assets/media/glasses/cocktail.png";
import collins from "../assets/media/glasses/collins.png";
import coupe from "../assets/media/glasses/coupe glass.png";
import magic from "../assets/media/glasses/magic glass.png";
import margarita from "../assets/media/glasses/Margarita.png";
import shoot from "../assets/media/glasses/shoot.png";
import rocks from "../assets/media/glasses/snifters.png";

import FooterApp from "./Footer";
import { useFonts } from "expo-font";

import alcohol from "../assets/media/alcohol.png";
import juice from "../assets/media/juice.png";
import extra from "../assets/media/extra.png";
import ice from "../assets/media/ice.png";
import shake from "../assets/media/shake.png";
import errase from "../assets/media/delete.png";
import plus from "../assets/media/plus.png";
import pergamino from "../assets/media/pergamino.jpg";
import AddCocktailIngredientModal from "../src/components/AddCocktailIngredientModal";
import { useNewCocktail } from "../src/hooks/useNewCocktail";
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

const glasses = [collins, cocktail, magic, margarita, shoot, coupe, rocks];

export const ingredientImages = {
  errase,
  alcohol,
  juice,
  extra,
  ice,
  shake,
};

const { width, height } = Dimensions.get("screen");

const NewCocktail = ({ navigation, route }) => {
  const {
    valueId = null,
    valueGlass = null,
    valueName = "",
    valueDescription = "",
    valueIngredients = [],
  } = route.params;

  const isEditing = valueId !== null;

  const [selectedType, setSelectedType] = useState("");
  const {
    glass,
    setGlass,
    cocktailName,
    setCocktailName,
    description,
    setDescription,
    cocktailIngredients,
    setCocktailIngredient,
    saveCurrentCocktail,
    deleteCurrentCocktail,
  } = useNewCocktail(
    valueId,
    valueGlass,
    valueName,
    valueDescription,
    valueIngredients
  );

  const [fontsLoaded, fontError] = useFonts({
    MedievalSharp: require("../assets/fonts/MedievalSharp.ttf"),
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [pressed, setPressed] = useState({
    alcohol: false,
    extra: false,
    juice: false,
    ice: false,
    shake: false,
  });

  const handlePress = (name) => {
    setPressed({
      alcohol: false,
      extra: false,
      juice: false,
      ice: false,
      shake: false,
      [name]: !pressed[name],
    });
    setSelectedType(name);
    setModalOpen(true);
  };

  if (fontError) {
    console.error(fontError);
    return <Text>Error loading font</Text>;
  }

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  const scrollViewRef = useRef();

  const scrollToItem = () => {
    scrollViewRef.current.scrollTo({
      x: 0,
      y: height / 2 + 80,
      animated: true,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wood}
        resizeMode="cover"
        style={styles.ImageBackground}
      >
        <View style={styles.backgroundColor}>
          <ScrollView showsVerticalScrollIndicator={false} ref={scrollViewRef}>
            <AddCoctelImage setGlass={setGlass} initialState={glass} />
            <View style={{ height: height + cocktailIngredients.length * 50 }}>
              <FormFieldName
                setter={setCocktailName}
                // text={"NAME"}
                valueName={cocktailName}
                StandardInputForm={StandardInputForm}
                style={styles.text}
                placeholderText={"Todo cocktail se merece un nombre..."}
              />
              <FormFieldDescription
                setter={setDescription}
                // text={"DESCRIPTION"}
                valueDescription={description}
                StandardInputDescription={StandardInputDescription}
                style={styles.text}
              />
              <AddIngredientList
                handlePress={handlePress}
                pressed={pressed}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                selectedType={selectedType}
                cocktailIngredients={cocktailIngredients}
                setCocktailIngredient={setCocktailIngredient}
                scrollToItem={scrollToItem}
              />
            </View>
          </ScrollView>
          {isEditing && (
            <DeleteButton
              deleteCurrentIngredient={async () => {
                await deleteCurrentCocktail();
                navigation.navigate("Index");
              }}
            />
          )}
          <SaveButton
            saveCurrentCocktail={async () => {
              await saveCurrentCocktail();
              navigation.navigate("Index");
            }}
          />
          <FooterApp />
        </View>
      </ImageBackground>
    </View>
  );
};

const DeleteButton = ({ deleteCurrentIngredient }) => {
  return (
    <Pressable onPress={deleteCurrentIngredient} style={styles.DeleteButton}>
      <Text style={[styles.text]}>DELETE</Text>
    </Pressable>
  );
};

const AddCoctelImage = ({ initialState = plus, setGlass }) => {
  const [source, setSource] = useState(initialState);
  return (
    <View style={styles.ImageContainer}>
      <View style={styles.AddHeader}>
        <Image source={source} style={styles.Image} />
      </View>
      <View style={styles.CoctelImage}>
        <CoctelImages setGlass={setGlass} setSource={setSource} />
      </View>
    </View>
  );
};

const CoctelImages = ({ setGlass, setSource }) => (
  <View style={styles.ImagesMap}>
    <ScrollView horizontal={true}>
      {glasses.map((glass, index) => (
        <CoctelImage
          glass={glass}
          key={index}
          setGlass={setGlass}
          setSource={setSource}
        />
      ))}
    </ScrollView>
  </View>
);

const CoctelImage = ({ glass, setGlass, setSource }) => (
  <View>
    <Pressable
      onPress={() => {
        setSource(glass);
        setGlass(glass);
      }}
    >
      <Image source={glass} style={[styles.Image, { opacity: 0.6 }]} />
    </Pressable>
  </View>
);

const AddIngredientList = ({
  pressed,
  handlePress,
  modalOpen,
  setModalOpen,
  selectedType,
  cocktailIngredients,
  setCocktailIngredient,
  scrollToItem,
}) => {
  return (
    <View>
      <ImageBackground source={pergamino} style={styles.AddIngredient}>
        {pressed && (
          <AddCocktailIngredientModal
            pressed={pressed}
            handlePress={handlePress}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedType={selectedType}
            setCocktailIngredient={setCocktailIngredient}
            scrollToItem={scrollToItem}
          />
        )}
        <IngredientsMap
          cocktailIngredients={cocktailIngredients}
          setCocktailIngredient={setCocktailIngredient}
        />
      </ImageBackground>

      <IngredientTypeSelected
        handlePress={handlePress}
        pressed={pressed}
        modalOpen={modalOpen}
      />
    </View>
  );
};

const IngredientsMap = ({ cocktailIngredients, setCocktailIngredient }) => {
  const addQuantityToIngredient = (id) => {
    const tempIngredients = cocktailIngredients;
    const quantity = tempIngredients.filter(
      (c) => c.ingredientCharacteristics.id === id
    )[0].quantity;

    tempIngredients.filter(
      (c) => c.ingredientCharacteristics.id === id
    )[0].quantity = quantity < 4 ? quantity + 1 : quantity;


    setCocktailIngredient([...tempIngredients]);
  };

  const substractQuantityToIngredient = (id) => {
    const tempIngredients = cocktailIngredients;
    const quantity = tempIngredients.filter(
      (c) => c.ingredientCharacteristics.id === id
    )[0].quantity;

    tempIngredients.filter(
      (c) => c.ingredientCharacteristics.id === id
    )[0].quantity = quantity > 1 ? quantity - 1 : quantity;

    console.log(tempIngredients);

    setCocktailIngredient([...tempIngredients]);
  };

  return (
    <View>
      {cocktailIngredients.map((cocktailIngredient, i) => {
        return (
          <IngredientItem
            cocktailIngredients={cocktailIngredients}
            cocktailIngredient={cocktailIngredient}
            key={i}
            setCocktailIngredient={setCocktailIngredient}
            addQuantityToIngredient={addQuantityToIngredient}
            substractQuantityToIngredient={substractQuantityToIngredient}
          />
        );
      })}
    </View>
  );
};

const IngredientItem = ({
  cocktailIngredient,
  setCocktailIngredient,
  addQuantityToIngredient,
  substractQuantityToIngredient,
}) => {
  return (
    <IngredientContent
      cocktailIngredient={cocktailIngredient}
      setCocktailIngredient={setCocktailIngredient}
      addQuantityToIngredient={addQuantityToIngredient}
      substractQuantityToIngredient={substractQuantityToIngredient}
    />
  );
};

const IngredientContent = ({
  cocktailIngredient,
  setCocktailIngredient,
  addQuantityToIngredient,
  substractQuantityToIngredient,
}) => {
  return (
    <>
      <View style={styles.IngredientOnList}>
        <View style={{ flex: 1 }}>
          <Pressable>
            <QuantityIngredient
              cocktailIngredient={cocktailIngredient}
              ingredientImage={
                cocktailIngredient.ingredientCharacteristics.ingredientType
              }
              addQuantityToIngredient={() =>
                addQuantityToIngredient(
                  cocktailIngredient.ingredientCharacteristics.id
                )
              }
            />
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            substractQuantityToIngredient(
              cocktailIngredient.ingredientCharacteristics.id
            );
          }}
          style={styles.ingredientName}
        >
          <Text style={styles.Ingredient}>
            {cocktailIngredient.ingredientCharacteristics.ingredientName}
          </Text>
        </Pressable>
        <DeleteIngredientButton setCocktailIngredient={setCocktailIngredient} />
      </View>
    </>
  );
};

const QuantityIngredient = ({
  ingredientImage,
  addQuantityToIngredient,
  cocktailIngredient,
}) => {
  useEffect(() => {
    console.log("Cocktail ingredient quantity?: ", cocktailIngredient);
  }, [cocktailIngredient]);

  return (
    <Pressable
      onPress={addQuantityToIngredient}
      style={styles.QuantityIngredient}
    >
      {[...Array(cocktailIngredient.quantity)].map((_, i) => (
        <Image
          key={i}
          source={ingredientImages[ingredientImage]}
          style={styles.ImageIngredientQuantity}
        />
      ))}
    </Pressable>
  );
};

const DeleteIngredientButton = ({
  setCocktailIngredient,
  cocktailIngredient,
}) => {
  return (
    <Pressable
      onPress={() => {
        console.log("Ingredient Deleted");
        setCocktailIngredient((prevCocktailIngredients) => {
          const index = prevCocktailIngredients.findIndex(
            (item) => item === cocktailIngredient
          );
          if (index !== -1) {
            const newCocktailIngredients = [...prevCocktailIngredients];
            newCocktailIngredients.splice(index, 1);
            return newCocktailIngredients;
          }
          return prevCocktailIngredients;
        });
      }}
    >
      <Image source={errase} style={styles.ImageIngredientQuantity} />
    </Pressable>
  );
};

const IngredientTypeSelected = ({ handlePress, pressed }) => {
  return (
    <>
      <View style={styles.Ingredients}>
        <ScrollView horizontal={true}>
          <Pressable
            onPress={() => handlePress("alcohol")}
            style={pressed.alcohol ? styles.Pressed : {}}
          >
            <Image source={alcohol} style={styles.IngredientType} />
          </Pressable>
          <Pressable
            onPress={() => handlePress("extra")}
            style={pressed.extra ? styles.Pressed : {}}
          >
            <Image source={extra} style={styles.IngredientType} />
          </Pressable>
          <Pressable
            onPress={() => handlePress("juice")}
            style={pressed.juice ? styles.Pressed : {}}
          >
            <Image source={juice} style={styles.IngredientType} />
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

const SaveButton = ({ saveCurrentCocktail }) => {
  return (
    <View style={styles.SaveButton}>
      <Pressable onPress={saveCurrentCocktail}>
        <Text style={styles.text}>SAVE</Text>
      </Pressable>
    </View>
  );
};

export default NewCocktail;

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
  ImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  Ingredients: {
    height: 120,
    width: width / 1.1,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    // alignItems: "center",
    flexDirection: "row",
    // justifyContent: "space-evenly",
  },
  Ingredient: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  AddHeader: {
    width: width / 3,
    height: 130,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  CoctelImage: {
    marginTop: 50,
    marginLeft: 10,
    // borderRadius: 10,
    width: 200,
    height: 110,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    // borderWidth: 4,
    // borderColor: "black",
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  Text: {
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  Image: {
    resizeMode: "contain",
    width: 100,
    height: 100,
  },
  ImagesMap: {
    flexDirection: "row",
  },
  AddIngredient: {
    // borderTopStartRadius: 15,
    // borderTopEndRadius: 15,
    width: width / 1.1,
    // backgroundColor: "rgba(161, 152, 152, 0.9)",
  },
  SaveButton: {
    position: "absolute",
    bottom: 120,
    alignContent: "center",
    width: width / 1.2,
    height: 50,
    backgroundColor: "rgba(255, 21, 21, 0.7)",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    justifyContent: "center",
  },
  Pressed: {
    backgroundColor: "rgba(218, 25, 25, 0.38)",
    // borderRadius: 4,
    // borderColor: "black",
    // borderWidth: 2,
  },
  ImageIngredientQuantity: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  IngredientOnList: {
    width: width / 1.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  ingredientName: {
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  QuantityIngredient: {
    flexDirection: "row",
  },
  DeleteButton: {
    position: "absolute",
    bottom: 185,
    alignContent: "center",
    width: width / 1.6,
    height: 50,
    backgroundColor: "rgba(255, 21, 21, 0.7)",
    borderWidth: 4,
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
  pergamino: {
    position: "absolute",
    resizeMode: "center",
    width: 500,
    height: 500,
  },
});
