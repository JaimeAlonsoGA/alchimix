import { createContext, useEffect, useState } from "react";
import { getCachedData, removeCachedData } from "../../saveData";
import { defaultCocktails, defaultIngredients } from "../defaultData";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [currentScreen, setCurrentScreen] = useState("");

  useEffect(() => {
    console.log(currentScreen);
  }
    , [currentScreen]);

  useEffect(() => {
    getCachedData("cocktails").then((data) => {
      if (data) {
        setCocktails(JSON.parse(data));
      }
      else {
        AsyncStorage.setItem('cocktails', JSON.stringify(defaultCocktails))
          .then(() => setCocktails(defaultCocktails));
      }
    });
    // removeCachedData("cocktails");
  }, []);

  useEffect(() => {
    getCachedData("ingredients").then((data) => {
      if (data) {
        setIngredients(JSON.parse(data));
      } else {
        AsyncStorage.setItem('ingredients', JSON.stringify(defaultIngredients))
          .then(() => setIngredients(defaultIngredients));
      }
    });
    // removeCachedData("ingredients");
  }, []);

  useEffect(() => {
    console.log("cocktails update!: ", cocktails);
  }, [cocktails]);

  useEffect(() => {
    console.log("Ingredients update!: ", ingredients);
  }, [ingredients]);

  return (
    <AppContext.Provider value={{ cocktails, setCocktails, ingredients, setIngredients, currentScreen, setCurrentScreen }}>
      {children}
    </AppContext.Provider>
  );
};
