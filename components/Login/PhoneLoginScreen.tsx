import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAutentification } from "@/hooks/useAutentification";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const PhoneLoginScreen = () => {
  const {
    phoneNumber,
    setPhoneNumber,
    verificationCode,
    setVerificationCode,
    signInWithPhone,
    confirmCode,
  } = useAutentification();

  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleSendCode = async () => {
    await signInWithPhone();
    setIsCodeSent(true); // Set state to indicate that the code has been sent
  };

  return (
    <View style={styles.container}>
      {!isCodeSent ? (
        <>
          <View>
            <Text style={styles.textEmailStyle}>No Handphone</Text>
            <View style={styles.countainerInputStyle}>
              <Feather
                name="smartphone"
                size={24}
                style={styles.iconInputStyle}
              />
              <TextInput
                style={styles.textInputStyle}
                placeholder="08xxxxxxxx"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="number-pad"
              />
            </View>
          </View>
          <TouchableOpacity>
            <Text style={styles.forgotPasswordStyle}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleSendCode}
            style={styles.buttonLoginStyle}
          >
            <Text style={styles.textButtonLoginStyle}>
              Send Verivication Code
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter Verification Code</Text>
          <View
            style={{
              borderRadius: 10,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderWidth: 1,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter verification code"
              value={verificationCode}
              onChangeText={setVerificationCode}
              keyboardType="number-pad"
            />
          </View>
          <TouchableOpacity
            onPress={confirmCode}
            style={styles.buttonLoginStyle}
          >
            <Text style={styles.textButtonLoginStyle}>Confirm Code</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "column",
    gap: 28,
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Poppins-Regular",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInputStyle: {
    color: Colors.light.darkBlue,
    fontFamily: "Poppins-Regular",
    height: 40,
    width: "100%",
  },
  iconInputStyle: {
    color: Colors.light.darkBlue,
    fontFamily: "Poppins-Regular",
  },
  countainerInputStyle: {
    flexDirection: "row",
    paddingRight: 1,
    paddingBottom: 4,
    alignItems: "center",
    gap: 10,
    borderBottomColor: Colors.light.darkBlue,
    borderBottomWidth: 1,
  },
  textEmailStyle: {
    paddingBottom: 4,
    color: Colors.light.gray,
    fontFamily: "Poppins-Regular",
  },
  forgotPasswordStyle: {
    textAlign: "right",
    fontFamily: "Poppins-SemiBold",
  },
  textButtonLoginStyle: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  buttonLoginStyle: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 14,
    borderRadius: 20,
  },
});

export default PhoneLoginScreen;
