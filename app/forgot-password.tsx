import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useForgotPassword } from "@/hooks/useForgotPassword";

const ForgotPassword = () => {
  const { email, setEmail, loading, handleSendOTP } = useForgotPassword();

  return (
    <View style={styles.container}>
      <Entypo name="fingerprint" size={40} color="black" />
      <Text style={styles.title}>Lupa Password</Text>
      <Text style={styles.description}>
        Masukkan alamat email Anda untuk menerima link reset password.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Alamat Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleSendOTP}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Mengirim..." : "Reset Password"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.buttonBackSignin}
        onPress={() => router.push("/login")}
        disabled={loading}
      >
        <Ionicons name="arrow-back-sharp" size={16} color="black" />
        <Text style={styles.textBackSignIn}>Back SignIn</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textBackSignIn: {
    fontFamily: "Poppins-Regular",
  },
  buttonBackSignin: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
    gap: 10,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.gray,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 14,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default ForgotPassword;
