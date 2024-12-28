import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React from "react";
import TabAuth from "@/components/Global/TabAuth";
import { useRoute } from "@react-navigation/native";
import FormLogin from "@/components/Login/FormLogin";
import { useAutentification } from "@/hooks/useAutentification";
import {
  KeyboardAwareScrollView,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import PhoneLoginScreen from "@/components/Login/PhoneLoginScreen";

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, signIn } =
    useAutentification();
  const route = useRoute();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ gap: 12 }}>
          <TabAuth route={route.name} />
          <FormLogin
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            signIn={signIn}
          />
          <PhoneLoginScreen />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
