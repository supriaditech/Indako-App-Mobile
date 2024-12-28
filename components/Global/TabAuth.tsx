import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { useRouter } from "expo-router";

interface TabAuthProps {
  route: string;
}

const TabAuth = ({ route }: TabAuthProps) => {
  const router = useRouter();

  return (
    <View style={styles.containerTabStyle}>
      <Image
        source={require("../../assets/images/indako_logo.png")}
        style={styles.imageLogoStyle}
      />
      <Image
        source={require("../../assets/images/IndakoLogoText.png")}
        style={styles.imageTextStyle}
      />
      <View style={styles.containerTabLoginAndSignup}>
        <TouchableOpacity
          onPress={() => router.push("/login")}
          style={[
            styles.tabButton,
            {
              borderBottomColor:
                route === "login" ? Colors.light.darkBlue : "transparent",
            },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              { color: route === "login" ? Colors.light.darkBlue : "black" },
            ]}
          >
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/register")}
          style={[
            styles.tabButton,
            {
              borderBottomColor:
                route === "register" ? Colors.light.darkBlue : "transparent",
            },
          ]}
        >
          <Text
            style={[
              styles.tabText,
              { color: route === "register" ? Colors.light.darkBlue : "black" },
            ]}
          >
            SignUp
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TabAuth;

const styles = StyleSheet.create({
  containerTabStyle: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 140,
    borderRadius: 20,
    paddingHorizontal: 20,
    backgroundColor: "white",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  containerTabLoginAndSignup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  imageTextStyle: {
    width: 160,
    height: 60,
  },
  imageLogoStyle: {
    width: 160,
    aspectRatio: 1,
    height: undefined,
  },
  tabButton: {
    width: "50%",
    paddingTop: 40,
    paddingBottom: 10,
    borderBottomWidth: 2,
  },
  tabText: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
  },
});
