import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react"; // Import useState
import TabAuth from "@/components/Global/TabAuth";
import { useRoute } from "@react-navigation/native";
import FormLogin from "@/components/Login/FormLogin";
import { useAutentification } from "@/hooks/useAutentification";
import PhoneLoginScreen from "@/components/Login/PhoneLoginScreen";
import { Colors } from "@/constants/Colors";

export default function LoginScreen() {
  const { email, setEmail, password, setPassword, signIn, loading } =
    useAutentification();
  const route = useRoute();

  const [isEmailLogin, setIsEmailLogin] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ gap: 12 }}>
          <TabAuth route={route.name} isEmailLogin={isEmailLogin} />
          <View style={styles.loginWithContainer}>
            <Text style={styles.loginWithText}>Login With</Text>
            <View style={styles.loginOptionsContainer}>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    backgroundColor: isEmailLogin
                      ? Colors.light.darkBlue
                      : "transparent",
                  },
                ]}
                onPress={() => setIsEmailLogin(true)} // Set to email login
              >
                <Text
                  style={[
                    styles.loginButtonText,
                    {
                      color: isEmailLogin ? "white" : "black",
                    },
                  ]}
                >
                  Email
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.loginButton,
                  {
                    backgroundColor: !isEmailLogin
                      ? Colors.light.darkBlue
                      : "transparent",
                  },
                ]}
                onPress={() => setIsEmailLogin(false)} // Set to phone login
              >
                <Text
                  style={[
                    styles.loginButtonText,
                    {
                      color: !isEmailLogin ? "white" : "black",
                    },
                  ]}
                >
                  No Handphone
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Conditional rendering based on selected login method */}
          {isEmailLogin ? (
            <FormLogin
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              signIn={signIn}
              loading={loading}
            />
          ) : (
            <PhoneLoginScreen />
          )}
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
  loginWithContainer: {
    paddingBottom: 10,
    paddingTop: 40,
  },
  loginWithText: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginBottom: 10,
  },
  loginOptionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  loginButton: {
    width: "50%",
    borderRadius: 10,
    padding: 10,
  },
  loginButtonText: {
    textAlign: "center",
  },
});
