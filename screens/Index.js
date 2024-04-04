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
import { getCachedData, removeCachedData } from "../saveData";
import { AppContext } from "../src/context/AppContext";

const { width, height } = Dimensions.get("screen");

const Index = () => {
  const navigation = useNavigation();
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wood}
        resizeMode="cover"
        style={styles.ImageBackground}
      >
        <View style={styles.backgroundColor}>
          <CocktailList navigation={navigation} />
          <FooterApp />
        </View>
      </ImageBackground>
    </View>
  );
};

const CocktailList = ({ navigation }) => {
  const {cocktails} = useContext(AppContext) 
  return(
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
      <Text style={styles.text}>{cocktail.cocktailName}</Text>
      <Image source={cocktail.glass} style={styles.Image} />
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
    backgroundColor: "rgba(92, 65, 50, 0.8)",
    width: width,
    height: height,
    alignItems: "center",
  },
  text: {
    marginTop: 6,
    color: "white",
    fontSize: 30,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
  cocktailItem: {
    width: 250,
    height: 250,
    backgroundColor: "rgba(0, 255, 133, 0.19)",
    // borderWidth: 4,
    // borderColor: "black",
    marginVertical: 50,
    alignItems: "center",
    flexDirection: "column",
  },
  Image: {
    marginTop: 20,
    resizeMode: "contain",
    width: 100,
    height: 200,
    position: "absolute",
  },
});
