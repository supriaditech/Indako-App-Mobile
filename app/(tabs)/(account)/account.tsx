import { View, Text, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderProfile from "@/components/Account/HeaderProfile";
import PhotoProfile from "@/components/Account/PhotoProfile";
import MenuAccount from "@/components/Account/MenuAccount";

export default function account() {
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <HeaderProfile />
      <PhotoProfile />
      <MenuAccount />
    </SafeAreaView>
  );
}
