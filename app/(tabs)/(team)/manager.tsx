import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
} from "react-native";
import { Colors } from "@/constants/Colors";
import firestore, { doc } from "@react-native-firebase/firestore";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderTeam from "@/components/Team/HeaderTeam";

interface OrganizationMember {
  id: string;
  name: string;
  jabatan: string;
  parentId: string | null;
  gender: string | null;
  staff?: OrganizationMember[]; // Optional staff property
}

const ManagerPage: React.FC = () => {
  const { managerId } = useLocalSearchParams<{ managerId: string }>();
  const [manager, setManager] = useState<OrganizationMember | null>(null);
  const [supervisors, setSupervisors] = useState<OrganizationMember[]>([]);
  console.log(supervisors);
  const fetchManagerDetails = async () => {
    try {
      const managerDoc = await firestore().collection("organization").get();
      if (managerDoc) {
        const data: OrganizationMember[] = managerDoc.docs.map((doc) => {
          const documentData = doc.data() as Omit<OrganizationMember, "id">;
          return { id: doc.id, ...documentData };
        });
        const managerData = data.find((item) => item.id === managerId) || null;
        setManager(managerData);
      } else {
        console.log(`Manager with ID ${managerId} not found in Firestore.`);
        setManager(null);
      }

      const snapshot = await firestore()
        .collection("organization")
        .where("parentId", "==", managerId)
        .get();
      const supervisorsData: OrganizationMember[] =
        snapshot.docs.map((doc) => {
          const documentData = doc.data() as Omit<OrganizationMember, "id">;
          return { id: doc.id, ...documentData };
        }) || [];

      const allStaffPromises = supervisorsData.map(async (supervisor) => {
        const staffSnapshot = await firestore()
          .collection("organization")
          .where("parentId", "==", supervisor.id)
          .get();
        const staffData: OrganizationMember[] = staffSnapshot.docs.map(
          (doc) => {
            const documentData = doc.data() as Omit<OrganizationMember, "id">;
            return { id: doc.id, ...documentData };
          }
        );
        return { supervisorId: supervisor.id, staff: staffData };
      });

      const allStaffData = await Promise.all(allStaffPromises);
      const staffMap = new Map<string, OrganizationMember[]>();
      allStaffData.forEach(({ supervisorId, staff }) => {
        staffMap.set(supervisorId, staff);
      });

      const supervisorsWithStaff = supervisorsData.map((supervisor) => ({
        ...supervisor,
        staff: staffMap.get(supervisor.id) || [], // Default to empty array
      }));

      setSupervisors(supervisorsWithStaff);
    } catch (error) {
      console.error("Error fetching manager and supervisors:", error);
    }
  };

  useEffect(() => {
    if (managerId) fetchManagerDetails();
  }, [managerId]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView>
        <HeaderTeam />
        {/* Manager Details */}
        {manager && (
          <View style={styles.directorContainer}>
            <Image
              source={
                manager.gender === "Female"
                  ? require("../../../assets/images/Team/PhotoFemale.png")
                  : require("../../../assets/images/Team/PhotoMale.png")
              }
              style={styles.profileImageManager}
            />
            <Text style={styles.nameText}>{manager.name}</Text>
            <View style={styles.positionContainer}>
              <Text style={styles.positionText}>{manager.jabatan}</Text>
              <Text style={styles.separator}>|</Text>
              <Text style={styles.positionText}>Indako</Text>
            </View>
            {/* Vertical Line */}
            <View style={styles.verticalLine}></View>
          </View>
        )}

        {/* Horizontal Line */}
        {supervisors.length <= 1 ? (
          // Jika jumlah supervisors lebih dari 1
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "50%",
                alignSelf: "center", // Ganti "marginHorizontal: 'auto'" dengan alignSelf
              }}
            >
              <View style={styles.verticalLineDoble}></View>
            </View>
          </View>
        ) : (
          // Jika jumlah supervisors kurang dari atau sama dengan 1
          <View>
            <View style={styles.horizontalLine}></View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "50%",
                alignSelf: "center", // Ganti "marginHorizontal: 'auto'" dengan alignSelf
              }}
            >
              <View style={styles.verticalLineDoble}></View>
              <View style={styles.verticalLineDoble}></View>
            </View>
          </View>
        )}

        {/* Supervisors */}
        <View style={styles.superVisorContainer}>
          {supervisors.map((supervisor) => (
            <View key={supervisor.id} style={styles.supervisorBox}>
              <Image
                source={
                  supervisor.gender === "Female"
                    ? require("../../../assets/images/Team/PhotoFemale.png")
                    : require("../../../assets/images/Team/PhotoMale.png")
                }
                style={styles.profileImage}
              />
              <Text style={styles.nameText}>{supervisor.name}</Text>
              <View style={styles.positionContainer}>
                <Text style={styles.positionText}>{supervisor.jabatan}</Text>
                <Text style={styles.separator}>|</Text>
                <Text style={styles.positionText}>Indako</Text>
              </View>

              {/* Display staff under each supervisor */}
              <View style={styles.staffContainer}>
                {supervisor.staff &&
                  supervisor.staff.map((staffMember) => (
                    <View key={staffMember.id} style={styles.staffBox}>
                      <Text style={styles.staffName}>{staffMember.name}</Text>
                      <Text style={styles.staffPosition}>
                        {staffMember.jabatan}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManagerPage;

const styles = StyleSheet.create({
  staffContainer: {
    marginTop: 10,
    width: "50%",
  },
  staffBox: {
    backgroundColor: Colors.light.softBlue,
    padding: 8,
    marginBottom: 6,
    borderRadius: 4,
  },
  staffName: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
  staffPosition: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "white",
    textAlign: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 60,
  },
  supervisorBox: {
    alignItems: "center",
  },
  superVisorContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  verticalLineDoble: {
    width: 2,
    height: 10,
    backgroundColor: Colors.light.darkBlue,
  },
  horizontalLine: {
    height: 2,
    backgroundColor: Colors.light.darkBlue,
    width: "50%",
    marginHorizontal: "auto",
  },
  directorContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImageManager: {
    width: 60,
    height: 60,
    borderRadius: 60,
  },
  nameText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: Colors.light.darkBlue,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    marginTop: 20,
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
    height: 10,
    backgroundColor: Colors.light.darkBlue,
    marginTop: 10,
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
  headerContainer: {
    backgroundColor: Colors.light.softGray,
    padding: 20,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  container: {
    padding: 16,
    backgroundColor: "white",
    flex: 1,
  },
});
