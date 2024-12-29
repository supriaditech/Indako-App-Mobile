import { showToast } from "@/components/ui/toast";
import { useState } from "react";
import auth from "@react-native-firebase/auth"; // Import Firebase Auth
import { router } from "expo-router";

const useForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleSendOTP = async () => {
    setLoading(true);
    try {
      await auth().sendPasswordResetEmail(email);
      showToast({
        message:
          "Email reset password telah dikirim. Silakan periksa inbox Anda.",
        type: "success",
        position: "top",
      });
      router.push("/login");
    } catch (error: any) {
      showToast({
        message: "Gagal mengirim email reset password: " + error.message,
        type: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };
  return {
    email,
    setEmail,
    loading,
    handleSendOTP,
  };
};

export { useForgotPassword };
