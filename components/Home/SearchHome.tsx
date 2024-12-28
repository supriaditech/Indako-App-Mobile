import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";

const SearchHome = () => {
  return (
    <View style={styles.countainerSearchStyle}>
      <Feather name="search" size={24} style={styles.colorBlueSkyStyle} />
      <TextInput style={styles.textInputBlueSkyStyle}>
        Find Product Indako
      </TextInput>
    </View>
  );
};

export default SearchHome;

const styles = StyleSheet.create({
  textInputBlueSkyStyle: {
    fontFamily: "Poppins-Regular",
    color: Colors.light.skyBlue,
    width: "100%",
  },
  colorBlueSkyStyle: {
    color: Colors.light.skyBlue,
  },
  countainerSearchStyle: {
    backgroundColor: Colors.light.softGray,
    paddingVertical: 4,
    paddingHorizontal: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginVertical: 8,
  },
});
