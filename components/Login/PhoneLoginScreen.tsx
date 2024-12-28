import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import { useAutentification } from "@/hooks/useAutentification";

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
          <Text style={styles.title}>Login with Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <Button title="Send Verification Code" onPress={handleSendCode} />
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter Verification Code</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            value={verificationCode}
            onChangeText={setVerificationCode}
            keyboardType="number-pad"
          />
          <Button title="Confirm Code" onPress={confirmCode} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "white",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default PhoneLoginScreen;
