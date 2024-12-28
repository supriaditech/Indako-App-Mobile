import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useAutentification } from "@/hooks/useAutentification";

const MenuAccount = () => {
  const { user } = useAuth();
  const { handleLogout } = useAutentification();
  return (
    <View style={{ paddingHorizontal: 40, flexDirection: "column", gap: 14 }}>
      <TouchableOpacity style={styles.buttonStyle}>
        <Feather name="lock" size={24} color="black" />
        <Text style={styles.textButtonStyle}>Change Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle}>
        <MaterialIcons name="info-outline" size={24} color="black" />
        <Text style={styles.textButtonStyle}>About Us</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle}>
        <MaterialCommunityIcons
          name="file-alert-outline"
          size={24}
          color="black"
        />
        <Text
          style={styles.textButtonStyle}
          onPress={() => router.push("/login")}
        >
          Terms and Conditions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle} onPress={handleLogout}>
        <AntDesign name="logout" size={24} color="black" />
        <Text style={styles.textButtonStyle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuAccount;

const styles = StyleSheet.create({
  textButtonStyle: {
    fontFamily: "Poppins-Regular",
  },
  buttonStyle: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    alignItems: "center",
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
});
