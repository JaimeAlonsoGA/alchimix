import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import wood from "../assets/media/wood.jpg";
import FooterApp from "./Footer";
import { useFonts } from "expo-font";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../src/context/AppContext";

import english from "../assets/english.png";
import spanish from "../assets/spanish.png";

const { width, height } = Dimensions.get("screen");

const languages = [
  { img: english, id: "english" },
  { img: spanish, id: "spanish" },
];

const Index = () => {
  const navigation = useNavigation();
  const [fontsLoaded, fontError] = useFonts({
    MedievalSharp: require("../assets/fonts/MedievalSharp.ttf"),
  });
  const { setCurrentScreen } = useContext(AppContext);

  useEffect(() => {
    setCurrentScreen("Index");
  }, []);

  if (fontError) {
    console.error(fontError);
    return <Text>Error loading font</Text>;
  }

  if (!fontsLoaded && !fontError) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wood}
        resizeMode="cover"
        style={styles.ImageBackground}
      >
        <View style={styles.backgroundColor}>
          <Language />
          <CocktailList navigation={navigation} />
          <FooterApp />
        </View>
      </ImageBackground>
    </View>
  );
};

const Language = () => {
  const {setAppLanguage} = useContext(AppContext);
  const [isSelected, setIsSelected] = useState({
    english: false,
    spanish: false,
  });

  const handlePress = (language) => {
    setIsSelected({
      english: false,
      spanish: false,
      [language]: true,
    });
    return language;
  }

  return (
    <View style={styles.language}>
      {languages.map((language, i) => (
        <TouchableOpacity key={i} onPress={() => {
          handlePress(language.id);
          setAppLanguage(language.id);
          }}>
          <Image source={language.img} style={[styles.languageButton, isSelected[language.id] ? { opacity: 0.8 } : { opacity: 0.2 }]} />
        </TouchableOpacity>
      ))}
    </View>
  )
};

const CocktailList = ({ navigation }) => {
  const { cocktails } = useContext(AppContext)
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {cocktails.map((cocktail, i) => (
        <CocktailItem cocktail={cocktail} key={i} navigation={navigation} />
      ))}
    </ScrollView>
  )
};

const CocktailItem = ({ cocktail, navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate("Cocktail", { cocktail })}
  >
    <View style={styles.cocktailItem}>
      <Image source={cocktail.glass} style={styles.Image} />
      <Text style={styles.text}>{cocktail.cocktailName}</Text>
    </View>
  </TouchableOpacity>
);

export default Index;

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
  language: {
    width: width,
    height: 20,
    flexDirection: 'column',
    position: 'absolute',
    top: 10,
  },
  languageButton: {
    resizeMode: "contain",
    width: 20,
    height: 20,
    margin: 10,
  },
  text: {
    top: 5,
    position: "absolute",
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  cocktailItem: {
    borderWidth: 1,
    borderColor: "#eeb51e",
    width: 250,
    height: 250,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    // borderWidth: 4,
    // borderColor: "black",
    marginVertical: '20%',
    alignItems: "center",
    flexDirection: "column",
    borderRadius: 20,
    justifyContent: "center",
  },
  Image: {
    // marginTop: 28,
    resizeMode: "contain",
    width: 100,
    height: 200,
    // position: "absolute",
    // opacity: 0.9,
  },
});
