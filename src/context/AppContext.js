import { createContext, useEffect, useState } from "react";
import { getCachedData } from "../../saveData";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getCachedData("cocktails").then((data) => {
      if (data) {
        setCocktails(JSON.parse(data));
      }
    });
    //removeCachedData("cocktails");
  }, []);

  useEffect(() => {
    getCachedData("ingredients").then((data) => {
      if (data) {
        setIngredients(JSON.parse(data));
      }
    });
    //removeCachedData("ingredients");
  }, []);

  useEffect(() => {
    console.log("cocktails update!: ", cocktails);
  }, [cocktails]);

  useEffect(() => {
    console.log("Ingredients update!: ", ingredients);
  }, [ingredients]);

  return (
    <AppContext.Provider value={{ cocktails, setCocktails, ingredients, setIngredients }}>
      {children}
    </AppContext.Provider>
  );
};
