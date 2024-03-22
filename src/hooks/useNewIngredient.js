import { useState } from "react";
import { getCachedData, setCachedData } from "../../saveData";
import uuid from "react-native-uuid";

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

  const saveCurrentIngredient = async () => {
    const ingredient = {
      ingredientType,
      ingredientName,
      alcoholStrength,
      description,
      id,
    };

    const currentIngredients = await getCachedData("ingredients");
    //conseguir datos de cache
    const parsedIngredients = JSON.parse(currentIngredients) || [];
    //convertir datos de string a json: Comprobar si el id existe, si existe reemplazarlo
    const index = parsedIngredients.findIndex(
      (item) => item.id === ingredient.id
    );

    if (index !== -1) {
      parsedIngredients[index] = ingredient;
    } else {
      parsedIngredients.push(ingredient);
    }

    // const ingredients = parsedIngredients
    //   ? [...parsedIngredients, ingredient]
    //   : [ingredient];

    //si hay datos, añadir el nuevo coche, si no, crear array con el nuevo coche
    await setCachedData("ingredients", JSON.stringify(parsedIngredients));
    //guardar datos en cache
  };

  const deleteCurrentIngredient = async () => {
    // Get the current ingredients from the cache
    const currentIngredients = await getCachedData("ingredients");
    const parsedIngredients = JSON.parse(currentIngredients) || [];

    // Find the index of the ingredient to delete
    const index = parsedIngredients.findIndex((item) => item.id === id);

    // If the ingredient is found, remove it from the array
    if (index !== -1) {
      parsedIngredients.splice(index, 1);
    }

    // Save the updated ingredients back to the cache
    await setCachedData("ingredients", JSON.stringify(parsedIngredients));

    console.log("Ingredient deleted");
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
