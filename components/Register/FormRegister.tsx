import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import {
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useRegister } from "@/hooks/useRegister";
import DropdownGender from "./DropdownGender";
import DropdownBanches from "./DropdownBanches";
import DropdownJabatan from "./DropdownJabatan";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

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
    gender,
    setGender,
    jabatan,
    setJabatan,
    selectedBranch,
    setSelectedBranch,
    register,
    loading,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
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
            placeholder="First Name"
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

      {/* Jenis Kelamin (Gender) */}
      <DropdownGender gender={gender} setGender={setGender} />

      {/* Tempat kerja */}
      <DropdownBanches
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />

      {/* Jabatan */}
      <DropdownJabatan jabatan={jabatan} setJabatan={setJabatan} />

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
              secureTextEntry={!showPassword}
            />
          </View>
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={24}
              color="black"
              style={styles.iconInputStyle}
            />
          </TouchableOpacity>
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
              secureTextEntry={!showPasswordConfirm}
            />
          </View>
          <TouchableOpacity
            onPress={() => setShowPasswordConfirm(!showPasswordConfirm)}
          >
            <Feather
              name={showPasswordConfirm ? "eye" : "eye-off"}
              size={24}
              color="black"
              style={styles.iconInputStyle}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View>
        <Text style={styles.forgotPasswordStyle}>
          Dengan mendaftar, Anda menyetujui segala{" "}
          <TouchableOpacity>
            <Text style={styles.termsConditionsStyle}>
              Terms and Conditions
            </Text>
          </TouchableOpacity>
        </Text>
        <TouchableOpacity
          style={styles.buttonLoginStyle}
          onPress={() => {
            register(() => {
              router.replace("/(tabs)"); // Navigasi ke aplikasi utama setelah pendaftaran
            });
          }}
        >
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
  termsConditionsStyle: {
    color: "blue", // Warna biru untuk Terms and Conditions
    textDecorationLine: "underline", // Menambahkan garis bawah (opsional)
  },
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
    textAlign: "center",
    fontFamily: "Poppins-Regular",
    fontSize: 12,
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
  pickerStyle: {
    height: 50,
    width: "80%",
    color: Colors.light.darkBlue,
  },
});
