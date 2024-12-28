import { showToast } from "@/components/ui/toast";
import { formatPhoneNumber } from "@/constants/FormatPhoneNumber";
import auth from "@react-native-firebase/auth"; // Import Firebase Auth
import { router } from "expo-router";
import { FirebaseError } from "firebase/app";
import { useState, useEffect } from "react";

const useAutentification = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const signIn = async () => {
    try {
      const user = await auth().signInWithEmailAndPassword(email, password);
      console.log(user);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);

      let errorMessage: string;

      // Memeriksa jenis kesalahan dan memberikan pesan yang sesuai
      if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email format.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "No user found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid credentials provided.";
      } else {
        errorMessage = "Sign in failed: An unexpected error occurred.";
      }

      showToast({
        message: errorMessage,
        type: "error",
        position: "top",
      });
    }
  };

  const signInWithPhone = async () => {
    try {
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      const confirmation = await auth().signInWithPhoneNumber(
        formattedPhoneNumber
      );
      setConfirmationResult(confirmation);
      showToast({
        message: "Verification code sent to your phone.",
        type: "success",
        position: "top",
      });
    } catch (error: any) {
      console.log(error);
      showToast({
        message: "Failed to send verification code: " + error.message,
        type: "error",
        position: "top",
      });
    }
  };

  const confirmCode = async () => {
    if (confirmationResult) {
      try {
        const user = await confirmationResult.confirm(verificationCode);
        console.log(user);
        if (user) router.replace("/(tabs)");
      } catch (error: any) {
        console.log(error);
        showToast({
          message: "Code confirmation failed: " + error.message,
          type: "error",
          position: "top",
        });
      }
    } else {
      showToast({
        message: "No verification code sent.",
        type: "error",
        position: "top",
      });
    }
  };

  const signUp = async () => {
    try {
      const user = await auth().createUserWithEmailAndPassword(email, password);
      if (user) router.replace("/(tabs)");
    } catch (error: any) {
      console.log(error);
      showToast({
        message: "Sign up failed: " + error.message,
        type: "error",
        position: "top",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await auth().signOut(); // Melakukan sign out
      showToast({
        message: "Successfully logged out.",
        type: "success",
        position: "top",
      });
      router.replace("/login"); // Navigasi ke halaman login setelah logout
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        console.log(error);
        showToast({
          message: "Logout failed: " + error.message,
          type: "error",
          position: "top",
        });
      } else {
        console.log("An unexpected error occurred:", error);
        showToast({
          message: "Logout failed: An unexpected error occurred.",
          type: "error",
          position: "top",
        });
      }
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    verificationCode,
    setVerificationCode,
    signIn,
    signUp,
    handleLogout,
    signInWithPhone,
    confirmCode,
  };
};

export { useAutentification };
