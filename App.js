import Index from "./screens/Index";
import Ingredients from "./screens/Ingredients";
import NewCocktail from "./screens/newCocktail";
import NewIngredient from "./screens/NewIngredient";
import Cocktail from "./screens/Cocktail";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { getCachedData } from "./saveData";
import { AppContextProvider } from "./src/context/AppContext";

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Index" component={Index} />
          <Stack.Screen name="Ingredients" component={Ingredients} />
          <Stack.Screen name="Addcoctel" component={NewCocktail} />
          <Stack.Screen name="NewIngredient" component={NewIngredient} />
          <Stack.Screen name="Cocktail" component={Cocktail} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
}
