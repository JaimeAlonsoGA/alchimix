import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const FormFieldName = ({
  setter,
  text,
  valueName,
  StandardInputForm,
}) => {
  return (
    <View>
      <Text style={[styles.text, {marginTop: 20}]}>{text}</Text>
      <StandardInputForm
        value={valueName}
        onChangeText={(text) => setter(text)}
      />
    </View>
  );
};

export const FormFieldDescription = ({
  setter,
  text,
  valueDescription,
  StandardInputDescription,
}) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <StandardInputDescription
        value={valueDescription}
        onChangeText={(text) => setter(text)}
      />
    </View>
  );
};

export const FormFieldAlcohol = ({
  setter,
  text,
  valueAlcohol,
  StandardInputAlcohol,
}) => {
  return (
    <View>
      <Text style={styles.text}>{text}</Text>
      <StandardInputAlcohol
        value={valueAlcohol}
        onChangeText={(text) => setter(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#f3d31a",
    fontSize: 20,
    textAlign: "center",
    fontFamily: "MedievalSharp",
  },
});
