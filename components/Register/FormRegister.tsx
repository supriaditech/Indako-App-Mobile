import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import { useRegister } from "@/hooks/useRegister";

const FormRegister = () => {
  const {
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
  } = useRegister();
  return (
    <View style={styles.countainerFormLoginStyle}>
      <View>
        <Text style={styles.textEmailStyle}>First Name</Text>
        <View style={styles.countainerInputStyle}>
          <AntDesign
            name="user"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="email"
            value={firstName}
            onChangeText={setFirstName}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titlePasswordInputStyle}>Last Name</Text>
        <View style={styles.countainerInputStyle}>
          <AntDesign
            name="user"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titlePasswordInputStyle}>Email</Text>
        <View style={styles.countainerInputStyle}>
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Email@gmail.com"
            value={email}
            onChangeText={setEmail}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titlePasswordInputStyle}>No Hp</Text>
        <View style={styles.countainerInputStyle}>
          <Feather name="smartphone" size={24} style={styles.iconInputStyle} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="08xxxxxxxx"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titlePasswordInputStyle}>Password</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 1,
            width: "100%",
            borderBottomColor: Colors.light.darkBlue,
            borderBottomWidth: 1,
            paddingBottom: 4,
          }}
        >
          <View style={styles.countainerInputPasswordStyle}>
            <MaterialIcons
              name="password"
              size={24}
              color="black"
              style={styles.iconInputStyle}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="*********"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          <Feather
            name="eye-off"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
        </View>
      </View>
      <View>
        <Text style={styles.titlePasswordInputStyle}>
          {" "}
          Password Confirmation
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingLeft: 1,
            width: "100%",
            borderBottomColor: Colors.light.darkBlue,
            borderBottomWidth: 1,
            paddingBottom: 4,
          }}
        >
          <View style={styles.countainerInputPasswordStyle}>
            <MaterialIcons
              name="password"
              size={24}
              color="black"
              style={styles.iconInputStyle}
            />
            <TextInput
              style={styles.textInputStyle}
              placeholder="*********"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
            />
          </View>
          <Feather
            name="eye-off"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
        </View>
      </View>

      <View>
        <TouchableOpacity onPress={() => router.push("/login")}>
          <Text style={styles.forgotPasswordStyle}>Back SignIn</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLoginStyle} onPress={register}>
          <Text style={styles.textButtonLoginStyle}>
            {loading ? "Loading..." : "Register"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormRegister;

const styles = StyleSheet.create({
  textButtonLoginStyle: {
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    color: "white",
  },
  buttonLoginStyle: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 14,
    marginTop: 20,
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

    width: "80%",
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
  countainerInputPasswordStyle: {
    flexDirection: "row",
    paddingRight: 1,
    alignItems: "center",
    gap: 10,
  },
  textEmailStyle: {
    paddingBottom: 4,
    color: Colors.light.gray,
    fontFamily: "Poppins-Regular",
  },
  countainerFormLoginStyle: {
    paddingTop: 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
    width: "100%",
    flexDirection: "column",
    gap: 28,
  },
});
