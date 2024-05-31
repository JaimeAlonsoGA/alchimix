import { useContext, useEffect, useState } from "react";
import { getCachedData, setCachedData } from "../../saveData";
import plus from "../../assets/media/plus.png";
import uuid from "react-native-uuid";
import { AppContext } from "../context/AppContext";

export const useNewCocktail = (
  initialId = null,
  initialGlass = plus,
  initialName = "",
  initialDescription = "",
  initialIngredients = []
) => {
  const [id, setId] = useState(
    initialId !== null && initialId !== undefined ? initialId : uuid.v4()
  );

  const [glass, setGlass] = useState(initialGlass);
  const [cocktailName, setCocktailName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);
  const [cocktailIngredients, setCocktailIngredient] =
    useState(initialIngredients);

  const { cocktails, setCocktails } = useContext(AppContext);

  const saveCurrentCocktail = async () => {
    const cocktail = {
      glass,
      cocktailName,
      description,
      cocktailIngredients,
      id,
    };

    const index = cocktails.findIndex((item) => item.id === cocktail.id);
    const tempCocktails = [...cocktails];

    if (index !== -1) {
      tempCocktails[index] = cocktail;
    } else {
      tempCocktails.unshift(cocktail);
    }

    await setCachedData("cocktails", JSON.stringify(tempCocktails));
    setCocktails([...tempCocktails]);
  };

  const deleteCurrentCocktail = async () => {
    const index = cocktails.findIndex((item) => item.id === id);

    if (index !== -1) {
      const newCocktails = [...cocktails];
      newCocktails.splice(index, 1);
      await setCachedData("cocktails", JSON.stringify(newCocktails));
      setCocktails(newCocktails);
      console.log("ingredient deleted");
    } else {
      console.log("ingredient not found");
    }
  };

  return {
    id,
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
  };
};
