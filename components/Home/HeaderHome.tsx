import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const HeaderHome = () => {
  return (
    <View style={styles.countainerLocationStyle}>
      <TouchableOpacity>
        <View style={styles.countainerMapStyle}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={24}
            style={styles.colorDarkBlue}
          />
          <View>
            <Text style={styles.textTitleMap}>INDAKO TRADING COY</Text>
            <Text style={styles.textAddressMapStyle}>
              Jl. Ngumban Surbakti No.25
            </Text>
          </View>
          <MaterialIcons
            name="keyboard-arrow-down"
            size={30}
            style={styles.colorDarkBlue}
          />
        </View>
      </TouchableOpacity>

      <Ionicons
        name="notifications-outline"
        size={24}
        style={styles.colorDarkBlue}
      />
    </View>
  );
};

export default HeaderHome;

const styles = StyleSheet.create({
  textAddressMapStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 8,
    color: Colors.light.softBlue,
  },
  textTitleMap: {
    fontFamily: "Poppins-Bold",
    color: Colors.light.darkBlue,
    fontSize: 11,
  },
  colorDarkBlue: {
    color: Colors.light.darkBlue,
  },
  countainerMapStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  countainerLocationStyle: {
    width: "100%",
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
