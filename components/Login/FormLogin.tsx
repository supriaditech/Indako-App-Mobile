import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

interface FormLoginProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  signIn: () => Promise<void>;
}

const FormLogin = ({
  email,
  setEmail,
  password,
  setPassword,
  signIn,
}: FormLoginProps) => {
  return (
    <View style={styles.countainerFormLoginStyle}>
      <View>
        <Text style={styles.textEmailStyle}>Email Address/No Hp</Text>
        <View style={styles.countainerInputStyle}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titlePasswordInputStyle}>Password</Text>
        <View style={styles.countainerInputStyle}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>
      <View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordStyle}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLoginStyle} onPress={signIn}>
          <Text style={styles.textButtonLoginStyle}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormLogin;

const styles = StyleSheet.create({
  textButtonLoginStyle: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  buttonLoginStyle: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 14,
    marginTop: 10,
    borderRadius: 20,
  },
  forgotPasswordStyle: {
    textAlign: "right",
    fontFamily: "Poppins-SemiBold",
  },
  titlePasswordInputStyle: {
    paddingBottom: 4,
    color: Colors.light.gray,
    fontFamily: "Poppins-Regular",
  },
  textInputStyle: {
    color: Colors.light.darkBlue,
    fontFamily: "Poppins-Regular",

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
  countainerFormLoginStyle: {
    paddingTop: 36,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "column",
    gap: 28,
  },
});
