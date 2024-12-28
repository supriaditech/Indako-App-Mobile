// useRegister.js
import { useState } from "react";
import { showToast } from "@/components/ui/toast"; // Pastikan Anda memiliki ini untuk umpan balik
import auth from "@react-native-firebase/auth"; // Menggunakan Firebase Auth
import firestore from "@react-native-firebase/firestore"; // Mengimpor Firestore
import { router } from "expo-router";
import { FirebaseError } from "@firebase/util"; // Mengimpor FirebaseError

const useRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (password !== passwordConfirm) {
      showToast({
        message: "Kata sandi tidak cocok!",
        type: "error",
        position: "top",
      });
      return;
    }

    setLoading(true);
    console.log("=============");
    try {
      // Membuat pengguna dengan email dan kata sandi
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      console.log("userCredential", userCredential);

      // Menyimpan informasi tambahan pengguna ke Firestore
      await firestore().collection("users").doc(userCredential.user.uid).set({
        firstName,
        lastName,
        phoneNumber,
        email,
      });

      console.log("Data pengguna berhasil disimpan ke Firestore");

      // Menampilkan pesan sukses dan navigasi
      showToast({
        message: "Pendaftaran berhasil!",
        type: "success",
        position: "top",
      });
      router.replace("/(tabs)"); // Navigasi ke aplikasi utama setelah pendaftaran
    } catch (error) {
      console.log("error", error);
      let errorMessage =
        "Pendaftaran gagal: Terjadi kesalahan yang tidak terduga.";
      if (error instanceof FirebaseError) {
        // Menangani kesalahan spesifik Firebase
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Alamat email ini sudah digunakan.";
            break;
          case "auth/invalid-email":
            errorMessage = "Format email tidak valid.";
            break;
          case "auth/weak-password":
            errorMessage = "Kata sandi harus terdiri dari minimal 6 karakter.";
            break;
          default:
            errorMessage = "Pendaftaran gagal: " + error.message;
            break;
        }
      }
      showToast({
        message: errorMessage,
        type: "error",
        position: "top",
      });
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
  };
};

export { useRegister };
