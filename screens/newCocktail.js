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
import React, { useContext, useEffect, useRef, useState } from "react";
import { useFonts } from "expo-font";
import { useNewCocktail } from "../src/hooks/useNewCocktail";
import {
  FormFieldName,
  FormFieldAlcohol,
  FormFieldDescription,
} from "../src/components/FormFields";
import {
  StandardInputDescription,
  StandardInputForm,
} from "../src/components/StandardInput";
import { AppContext } from "../src/context/AppContext";

import wood from "../assets/media/wood.jpg";
import cocktail from "../assets/media/glasses/cocktail.png";
import collins from "../assets/media/glasses/collins.png";
import coupe from "../assets/media/glasses/coupe glass.png";
import magic from "../assets/media/glasses/magic glass.png";
import margarita from "../assets/media/glasses/Margarita.png";
import shoot from "../assets/media/glasses/shoot.png";
import rocks from "../assets/media/glasses/snifters.png";
import FooterApp from "./Footer";
import alcohol from "../assets/media/alcoholType.png";
import juice from "../assets/media/juiceType.png";
import extra from "../assets/media/extraType.png";
import ice from "../assets/media/ice.png";
import shake from "../assets/media/shake.png";
import errase from "../assets/media/delete.png";
import alcoholPortion from "../assets/media/alcohol.png";
import juicePortion from "../assets/media/juice.png";
import extraPortion from "../assets/media/extra.png";
import plus from "../assets/media/plus.png";
import pergamino from "../assets/media/pergamino.jpg";
import AddCocktailIngredientModal from "../src/components/AddCocktailIngredientModal";

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

  const { setCurrentScreen } = useContext(AppContext);

  useEffect(() => {
    setCurrentScreen("Addcoctel");
  }, []);

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
            <View style={{ height: height + cocktailIngredients.length * 100 }}>
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
                setCurrentScreen("Index");
              }}
            />
          )}
          <FooterApp saveCurrentCocktail={async () => await saveCurrentCocktail()} />
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

const AddCoctelImage = ({ setGlass, initialState }) => {
  const [source, setSource] = useState(initialState);

  useEffect(() => {
    if (source === plus) {
      const randomGlass = glasses[Math.floor(Math.random() * 7)];
      setSource(randomGlass);
      setGlass(randomGlass);
    }
  }, []);

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
      <Image source={glass} style={[styles.ImageScrollView, { opacity: 0.6 }]} />
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
  const isCocktailIngredient = true;
  return (
    <View>
      <View style={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', marginTop: 40 }}>
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
              isCocktailIngredient={isCocktailIngredient}
            />
          )}
          <IngredientsMap
            cocktailIngredients={cocktailIngredients}
            setCocktailIngredient={setCocktailIngredient}
          />
        </ImageBackground>
      </View>

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
    )[0].quantity = quantity < 5 ? quantity + 1 : quantity - 4;


    setCocktailIngredient([...tempIngredients]);
  };

  // const substractQuantityToIngredient = (id) => {
  //   const tempIngredients = cocktailIngredients;
  //   const quantity = tempIngredients.filter(
  //     (c) => c.ingredientCharacteristics.id === id
  //   )[0].quantity;

  //   tempIngredients.filter(
  //     (c) => c.ingredientCharacteristics.id === id
  //   )[0].quantity = quantity > 1 ? quantity - 1 : quantity;

  //   console.log(tempIngredients);

  //   setCocktailIngredient([...tempIngredients]);
  // };

  return (
    <View>
      {cocktailIngredients.map((cocktailIngredient) => {
        return (
          <IngredientItem
            cocktailIngredients={cocktailIngredients}
            cocktailIngredient={cocktailIngredient}
            setCocktailIngredient={setCocktailIngredient}
            addQuantityToIngredient={addQuantityToIngredient}
          // substractQuantityToIngredient={substractQuantityToIngredient}
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
  // substractQuantityToIngredient,
}) => {
  return (
    <IngredientContent
      cocktailIngredient={cocktailIngredient}
      setCocktailIngredient={setCocktailIngredient}
      addQuantityToIngredient={addQuantityToIngredient}
    // substractQuantityToIngredient={substractQuantityToIngredient}
    />
  );
};

const IngredientContent = ({
  cocktailIngredient,
  setCocktailIngredient,
  addQuantityToIngredient,
}) => {
  return (
    <>
      <Pressable style={styles.IngredientOnList}
        onPress={() =>
          addQuantityToIngredient(
            cocktailIngredient.ingredientCharacteristics.id
          )}>
        <View>
          <QuantityIngredient
            cocktailIngredient={cocktailIngredient}
            ingredientImage={
              cocktailIngredient.ingredientCharacteristics.ingredientType
            }
          />
        </View>
        <View style={styles.ingredientContainer}>
          <View
            style={styles.ingredientName}
          >
            <Text style={styles.Ingredient}>
              {cocktailIngredient.ingredientCharacteristics.ingredientName}
            </Text>
          </View>
          <DeleteIngredientButton setCocktailIngredient={setCocktailIngredient} cocktailIngredient={cocktailIngredient} />
        </View>
      </Pressable >
      <Pressable onPress={() =>
        addQuantityToIngredient(
          cocktailIngredient.ingredientCharacteristics.id
        )
      } style={styles.quantityContainer}>
        <Text style={styles.quantityText}>{cocktailIngredient.ingredientCharacteristics.ingredientType === "shake"
          ? "" : "Quantity:"}</Text>
        {[...Array(cocktailIngredient.quantity)].map((_, i) => (
          <View style={styles.quantityItem}>
            <Image
              key={i}
              source={cocktailIngredient.ingredientCharacteristics.ingredientType === "ice"
                ? ice
                : cocktailIngredient.ingredientCharacteristics.ingredientType === "juice"
                  ? juicePortion
                  : cocktailIngredient.ingredientCharacteristics.ingredientType === "alcohol"
                    ? alcoholPortion
                    : cocktailIngredient.ingredientCharacteristics.ingredientType === "extra"
                      ? extraPortion
                      : null
              }
              style={styles.ImageIngredientQuantity}
            />
          </View>
        ))}
      </Pressable>
    </>
  );
};

const QuantityIngredient = ({
  ingredientImage,
  cocktailIngredient,
}) => {
  useEffect(() => {
    console.log("New ingredient added to cocktail: ", cocktailIngredient);
  }, [cocktailIngredient]);

  return (
    <View
      style={styles.QuantityIngredient}
    >
      <Image
        source={ingredientImages[ingredientImage]}
        style={styles.imgIngredient}
      />
    </View>
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
            return [...newCocktailIngredients];
          }
          return prevCocktailIngredients;
        });
      }}
    >
      <Image source={errase} style={styles.erraseIcon} />
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
    backgroundColor: "rgba(92, 65, 50, 0.6)",
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: 100,
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
    flex: 1,
    borderRadius: 20,
    width: width / 3,
    height: 130,
    backgroundColor: "rgba(0, 255, 133, 0.2)",
    borderWidth: 1,
    borderColor: "#eeb51e",
    marginTop: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  CoctelImage: {
    borderWidth: 1,
    borderColor: "#eeb51e",
    borderRadius: 20,
    marginTop: 50,
    marginLeft: 10,
    width: 200,
    height: 110,
    backgroundColor: "rgba(0, 255, 133, 0.15)",
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
  ImageScrollView: {
    resizeMode: "contain",
    width: 80,
    height: 80,
  },
  ImagesMap: {
    flexDirection: "row",
  },
  AddIngredient: {
    width: width / 1.1,
  },
  Pressed: {
    backgroundColor: "rgba(218, 25, 25, 0.38)",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    // borderColor: "black",
    // borderWidth: 2,
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
  erraseIcon: {
    resizeMode: "contain",
    width: 30,
    height: 30,
    marginLeft: 10,
  },
  IngredientOnList: {
    width: width / 1.1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    marginTop: 10,
  },
  ingredientContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ingredientButton: {
    flexDirection: "row",
    alignItems: "center",
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
    bottom: '15%',
    alignContent: "center",
    width: width / 1.6,
    height: 50,
    backgroundColor: "rgba(255, 21, 21, 0.3)",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 20,
    justifyContent: "center",
  },
  IngredientType: {
    resizeMode: "contain",
    width: 70,
    height: 70,
    margin: 10,
  },
  pergamino: {
    position: "absolute",
    resizeMode: "center",
    width: 500,
    height: 500,
  },
  glassText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "MedievalSharp",
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
});
