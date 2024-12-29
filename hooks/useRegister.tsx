import { useState } from "react";
import { showToast } from "@/components/ui/toast"; // Pastikan Anda memiliki ini untuk umpan balik
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { FirebaseError } from "@firebase/util";
import { useAuth, User } from "@/contexts/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompanyBranch } from "./useCompanyBranches";

const useRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState<string>("");
  const [jabatan, setJabatan] = useState<string>("");
  const [selectedBranch, setSelectedBranch] = useState<CompanyBranch | null>(
    null
  );
  const { setUser } = useAuth();

  const isValidEmail = (email: string) => {
    const trimmedEmail = email.trim(); // Hapus kelebihan spasi
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex untuk memvalidasi email
    return emailRegex.test(trimmedEmail);
  };

  const register = async (onSuccess: () => void) => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !password ||
      !passwordConfirm ||
      !gender ||
      !jabatan ||
      !selectedBranch
    ) {
      showToast({
        message: "Semua field harus diisi!",
        type: "error",
        position: "top",
      });
      return;
    }

    const trimmedEmail = email.trim(); // Hapus spasi setelah @gmail.com
    if (!isValidEmail(trimmedEmail)) {
      showToast({
        message: "Format email tidak valid!",
        type: "error",
        position: "top",
      });
      return;
    }

    if (password !== passwordConfirm) {
      showToast({
        message: "Kata sandi tidak cocok!",
        type: "error",
        position: "top",
      });
      return;
    }

    setLoading(true);

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        trimmedEmail,
        password
      );
      const uid = userCredential.user.uid;
      const userData: User = {
        uid,
        email: trimmedEmail,
        firstName,
        lastName,
        phoneNumber,
        gender,
        jabatan,
        branch: selectedBranch.id,
      };
      await firestore().collection("users").doc(uid).set(userData);
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));

      showToast({
        message: "Pendaftaran berhasil!",
        type: "success",
        position: "top",
      });
      onSuccess();
    } catch (error) {
      let errorMessage = "Pendaftaran gagal.";
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email ini sudah digunakan.";
            break;
          case "auth/invalid-email":
            errorMessage = "Format email tidak valid.";
            break;
          case "auth/weak-password":
            errorMessage = "Kata sandi terlalu lemah.";
            break;
        }
      }
      showToast({ message: errorMessage, type: "error", position: "top" });
    } finally {
      setLoading(false);
    }
  };

  return {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    phoneNumber,
    setPhoneNumber,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    register,
    loading,
    gender,
    setGender,
    jabatan,
    setJabatan,
    selectedBranch,
    setSelectedBranch,
  };
};

export { useRegister };
