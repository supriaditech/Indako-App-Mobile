import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import firestore from "@react-native-firebase/firestore";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

interface OrganizationMember {
  id: string;
  name: string;
  jabatan: string;
  parentId: string | null;
  gender: string | null;
}

const ContentTeam = () => {
  const [director, setDirector] = useState<OrganizationMember | null>(null); // Direktur
  const [managers, setManagers] = useState<OrganizationMember[]>([]); // Manager
  const { userBranch } = useAuth();

  // Fetch data dari Firestore
  const fetchData = async () => {
    try {
      const snapshot = await firestore().collection("organization").get();
      const data: OrganizationMember[] = snapshot.docs.map((doc) => {
        const documentData = doc.data() as Omit<OrganizationMember, "id">; // Ambil semua data kecuali "id"
        return {
          id: doc.id, // Tambahkan ID dokumen Firestore
          ...documentData, // Spread sisa data dari dokumen
        };
      });

      // Ambil direktur (tanpa parentId)
      const directorData = data.find((item) => item.parentId === null) || null;
      setDirector(directorData);

      // Ambil manager (parentId = id direktur)
      if (directorData) {
        const managerData = data.filter(
          (item) => item.parentId === directorData.id
        );
        setManagers(managerData);
      }
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Organizational Structure</Text>
        <Text style={styles.branchText}>
          {" "}
          {userBranch?.office_name || "No Branch"}
        </Text>
        <Text style={styles.locationText}>
          {userBranch?.location || "No Location"}
        </Text>
      </View>

      {/* Baris 1 UNTUK DIREKTUR SAJA  */}
      {director && (
        <View style={styles.directorContainer}>
          <Image
            source={require("../../assets/images/Team/PhotoMale.png")}
            style={styles.profileImage}
          />
          <Text style={styles.nameText}>{director.name}</Text>
          <View style={styles.positionContainer}>
            <Text style={styles.positionText}>{director.jabatan}</Text>
            <Text style={styles.separator}>|</Text>
            <Text style={styles.positionText}>
              {" "}
              {userBranch?.office_name || "No Branch"}
            </Text>
          </View>
          {/* Vertical Line */}
          <View style={styles.verticalLine}></View>
        </View>
      )}

      {/* Garis Horizontal */}
      <View style={styles.horizontalLine}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "50%",
          marginHorizontal: "auto",
        }}
      >
        <View style={styles.verticalLineDoble}></View>
        <View style={styles.verticalLineDoble}></View>
      </View>

      {/* Baris 2 UNTUK MANGER SAJA  */}

      <View style={styles.managerContainer}>
        {managers.map((manager) => (
          <View key={manager.id} style={styles.managerBox}>
            <Image
              source={
                manager?.gender === "Female"
                  ? require("../../assets/images/Team/PhotoFemale.png")
                  : require("../../assets/images/Team/PhotoMale.png")
              }
              style={styles.profileImage}
            />
            <Text style={styles.nameText}>{manager.name}</Text>
            <View style={styles.positionContainer}>
              <Text style={styles.positionText}>{manager.jabatan}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.positionText}>Indako</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.light.darkBlue,
                paddingVertical: 8,
                marginTop: 2,
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
              onPress={() =>
                router.push({
                  pathname: "/manager",
                  params: { managerId: manager.id }, // Kirimkan ID manager ke halaman Manager
                })
              }
            >
              <Text style={styles.nameTextButton}>Lihat Anggota Lain</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ContentTeam;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.light.softGray,
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  headerText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  branchText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 24,
    color: Colors.light.darkBlue,
    textAlign: "center",
  },
  locationText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
  },
  directorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  nameText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: Colors.light.darkBlue,
    textAlign: "center",
  },
  nameTextButton: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: "white",
  },
  positionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  positionText: {
    color: Colors.light.darkBlue,
  },
  separator: {
    color: Colors.light.darkBlue,
  },
  verticalLine: {
    width: 2,
    height: 30,
    backgroundColor: Colors.light.darkBlue,
    marginTop: 10,
  },
  verticalLineDoble: {
    width: 2,
    height: 30,
    backgroundColor: Colors.light.darkBlue,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: Colors.light.darkBlue,
    width: "50%",
    marginHorizontal: "auto",
  },
  managerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  managerBox: {
    alignItems: "center",
  },
});
