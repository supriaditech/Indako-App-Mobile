import { View, Text, SafeAreaView, StatusBar, StyleSheet } from "react-native";
import React from "react";
import TabAuth from "@/components/Global/TabAuth";
import { useRoute } from "@react-navigation/native";

const Register = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <TabAuth route={route.name} />
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
