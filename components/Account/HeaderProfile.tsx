import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const HeaderProfile = () => {
  return (
    <View style={styles.CountainerHeaderProfile}>
      <Text style={styles.TitleProfileStyle}>Account</Text>
    </View>
  );
};

export default HeaderProfile;

const styles = StyleSheet.create({
  TitleProfileStyle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: Colors.light.darkBlue,
  },
  CountainerHeaderProfile: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
