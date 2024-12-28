import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React from "react";
import TabAuth from "@/components/Global/TabAuth";
import { useRoute } from "@react-navigation/native";
import FormRegister from "@/components/Register/FormRegister";

const Register = () => {
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ gap: 12 }}>
          <TabAuth route={route.name} isEmailLogin={true} />
          <FormRegister />
        </ScrollView>
      </KeyboardAvoidingView>
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
