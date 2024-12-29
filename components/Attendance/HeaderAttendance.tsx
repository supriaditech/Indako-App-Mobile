import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Colors } from "@/constants/Colors";

const HeaderAttendance = () => {
  const { userBranch, user } = useAuth();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Attendance</Text>
        <View style={styles.branchContainer}>
          <Text style={styles.textTitleMap}>
            {userBranch?.office_name || "No Branch"}
          </Text>
          <Text style={styles.textAddressMapStyle}>
            {userBranch?.location || "No Location"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default HeaderAttendance;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontFamily: "Poppins-Bold",
    fontSize: 18,
    color: Colors.light.darkBlue,
  },
  branchContainer: {
    alignItems: "flex-end",
  },
  textAddressMapStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 8,
    color: Colors.light.softBlue,
  },
  textTitleMap: {
    fontFamily: "Poppins-Bold",
    color: Colors.light.darkBlue,
    fontSize: 11,
  },
});
