import { useContext, useState } from "react";
import { getCachedData, setCachedData } from "../../saveData";
import uuid from "react-native-uuid";
import { AppContext } from "../context/AppContext";

export const useNewIngredient = (
  initialId = null,
  initialName = "",
  initialDescription = "",
  initialType = "alcohol",
  initialStrength = 0
) => {
  const [id, setId] = useState(
    initialId !== null && initialId !== undefined ? initialId : uuid.v4()
  );
  const [ingredientType, setIngredientType] = useState(initialType);
  const [ingredientName, setIngredientName] = useState(initialName);
  const [alcoholStrength, setAlcoholStrength] = useState(initialStrength);
  const [description, setDescription] = useState(initialDescription);

  const { ingredients, setIngredients } = useContext(AppContext);

  const saveCurrentIngredient = async () => {
    const ingredient = {
      ingredientType,
      ingredientName,
      alcoholStrength,
      description,
      id,
    };

    const index = ingredients.findIndex((item) => item.id === ingredient.id);
    const tempIngredients = ingredients;

    if (index !== -1) {
      tempIngredients[index] = ingredient;
    } else {
      tempIngredients.push(ingredient);
    }

    // const ingredients = parsedIngredients
    //   ? [...parsedIngredients, ingredient]
    //   : [ingredient];

    //si hay datos, añadir el nuevo coche, si no, crear array con el nuevo coche
    await setCachedData("ingredients", JSON.stringify(tempIngredients));
    setIngredients([...tempIngredients]);
    //guardar datos en cache
  };

  const deleteCurrentIngredient = async () => {
    const index = ingredients.findIndex((item) => item.id === id);

    if (index !== -1) {
      const newIngredients = [...ingredients];
      newIngredients.splice(index, 1);
      await setCachedData("ingredients", JSON.stringify(newIngredients));
      setIngredients(newIngredients);
      console.log("ingredient deleted");
    } else {
      console.log("ingredient not found");
    }
  };

  return {
    id,
    ingredientType,
    setIngredientType,
    ingredientName,
    setIngredientName,
    alcoholStrength,
    setAlcoholStrength,
    description,
    setDescription,
    saveCurrentIngredient,
    deleteCurrentIngredient,
  };
};
