import { createContext, useEffect, useState } from "react";
import { getCachedData } from "../../saveData";

export const CocktailContext = createContext();

export const CocktailContextProvider = ({ children }) => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    getCachedData("cocktails").then((data) => {
      if (data) {
        setCocktails(JSON.parse(data));
        // console.log(cocktails);
      }
    });
    //removeCachedData("cocktails");
  }, []);

  useEffect(() => {
    console.log("cocktails update!: ", cocktails);
  }, [cocktails]);

  return (
    <CocktailContext.Provider value={{ cocktails, setCocktails }}>
      {children}
    </CocktailContext.Provider>
  );
};
