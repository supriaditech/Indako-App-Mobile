import { View, Text, StyleSheet, StatusBar } from "react-native";
import React from "react";
import HeaderTeam from "@/components/Team/HeaderTeam";
import { SafeAreaView } from "react-native-safe-area-context";
import ContentTeam from "@/components/Team/ContentTeam";
import CreateOrganizationPage from "@/components/Team/Test";

const Team = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <HeaderTeam />
      {/* <CreateOrganizationPage /> */}
      <ContentTeam />
    </SafeAreaView>
  );
};

export default Team;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
