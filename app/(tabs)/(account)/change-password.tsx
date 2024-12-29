import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const reauthenticate = async (currentPassword: string) => {
    const user = auth().currentUser;
    if (!user || !user.email) {
      throw new Error("User is not authenticated.");
    }
    const credential = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    await user.reauthenticateWithCredential(credential);
  };

  const showAlertModal = (title: string, message: string) => {
    setAlertData({ title, message });
    setShowAlert(true);
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword) {
      showAlertModal("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      showAlertModal(
        "Error",
        "New password must be at least 6 characters long."
      );
      return;
    }

    setLoading(true);
    try {
      const user = auth().currentUser;
      if (!user) {
        showAlertModal("Error", "User is not authenticated.");
        return;
      }
      await reauthenticate(currentPassword);
      await user.updatePassword(newPassword);
      showAlertModal("Success", "Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error: any) {
      showAlertModal("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ gap: 12 }}>
          <View style={styles.content}>
            <Entypo name="fingerprint" size={40} color="black" />
            <Text style={styles.title}>Change Password</Text>
            <Text style={styles.description}>
              Please enter your current and new password.
            </Text>
            <View style={styles.formContainer}>
              {/* Input Current Password */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Current Password"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  secureTextEntry={!showCurrentPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowCurrentPassword((prev) => !prev)}
                  style={styles.eyeIcon}
                >
                  <Entypo
                    name={showCurrentPassword ? "eye" : "eye-with-line"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              {/* Input New Password */}
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry={!showNewPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowNewPassword((prev) => !prev)}
                  style={styles.eyeIcon}
                >
                  <Entypo
                    name={showNewPassword ? "eye" : "eye-with-line"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              {/* Submit Button */}
              <TouchableOpacity
                style={[
                  styles.button,
                  { backgroundColor: loading ? "gray" : Colors.light.darkBlue },
                ]}
                onPress={handleChangePassword}
                disabled={loading}
              >
                <Text style={styles.buttonText}>
                  {loading ? "Changing..." : "Change Password"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Modern Alert */}
      <Modal isVisible={showAlert} onBackdropPress={() => setShowAlert(false)}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{alertData.title}</Text>
          <Text style={styles.alertMessage}>{alertData.message}</Text>
          <TouchableOpacity
            onPress={() => setShowAlert(false)}
            style={styles.alertButton}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 20,
    justifyContent: "center",
    flexDirection: "column",
    height: 700,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  formContainer: {
    gap: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    paddingRight: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    fontFamily: "Poppins-Regular",
  },
  eyeIcon: {
    marginLeft: 10,
  },
  button: {
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: Colors.light.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  alertButtonText: {
    color: "white",
    fontSize: 16,
  },
});
