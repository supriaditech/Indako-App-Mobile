import BannerHome from "@/components/Home/BannerHome";
import HeaderHome from "@/components/Home/HeaderHome";
import ListProductHome from "@/components/Home/ListProductHome";
import ProductPopularHome from "@/components/Home/ProductPopularHome";
import SearchHome from "@/components/Home/SearchHome";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";
import { StyleSheet, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <HeaderHome />
      <SearchHome />
      <ScrollView showsVerticalScrollIndicator={false}>
        <BannerHome />
        <ProductPopularHome />
        <ListProductHome />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
