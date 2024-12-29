import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import { useAuth } from "@/contexts/AuthContext";

const PhotoProfile = () => {
  const { user, loading, userBranch } = useAuth();
  return (
    <View style={styles.CountainerPhotoProfileStyle}>
      <View style={styles.backgroundPhotoProfileStyle}>
        <Image
          source={require("../../assets/images/Account/photoProfile.png")}
          style={styles.imageStyle}
        />
      </View>
      <View style={styles.countainerDescriptionProfileStyle}>
        <Text style={styles.textWhiteStyle}>{user?.jabatan}</Text>
        <Text style={styles.textNameStyle}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.textWhiteStyle}>{userBranch?.office_name}</Text>
      </View>
    </View>
  );
};

export default PhotoProfile;

const styles = StyleSheet.create({
  textNameStyle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 18,
    color: "white",
  },
  textWhiteStyle: {
    fontFamily: "Poppins-Regular",
    color: "white",
    fontSize: 12,
  },
  countainerDescriptionProfileStyle: {
    backgroundColor: Colors.light.cyan,
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  imageStyle: {
    width: 340,
    aspectRatio: 1,
    height: undefined,
    position: "absolute",
    bottom: 0,
    right: -45,
  },
  backgroundPhotoProfileStyle: {
    backgroundColor: Colors.light.darkBlue,
    height: 250,
    width: "70%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: "relative",
  },
  CountainerPhotoProfileStyle: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 40,
  },
});
