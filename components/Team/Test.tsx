import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface OrganizationMember {
  id: string;
  name: string;
  jabatan: string;
  parentId: string | null;
  gender: "Male" | "Female";
}

const CreateOrganizationPage: React.FC = () => {
  // Data organisasi dengan tambahan gender
  const organizationData: OrganizationMember[] = [
    {
      id: "1",
      name: "Supriadi",
      jabatan: "Direktur",
      parentId: null,
      gender: "Male",
    },
    {
      id: "2",
      name: "Canty Risa",
      jabatan: "Manager",
      parentId: "1",
      gender: "Female",
    },
    {
      id: "3",
      name: "Dity Sury",
      jabatan: "Manager",
      parentId: "1",
      gender: "Male",
    },
    {
      id: "4",
      name: "Ardi",
      jabatan: "Supervisor",
      parentId: "2",
      gender: "Male",
    },
    {
      id: "5",
      name: "Wina",
      jabatan: "Supervisor",
      parentId: "2",
      gender: "Female",
    },
    {
      id: "6",
      name: "Bayu",
      jabatan: "Supervisor",
      parentId: "3",
      gender: "Male",
    },
    {
      id: "7",
      name: "Dian",
      jabatan: "Staff",
      parentId: "4",
      gender: "Female",
    },
    { id: "8", name: "Fajar", jabatan: "Staff", parentId: "4", gender: "Male" },
    {
      id: "9",
      name: "Rina",
      jabatan: "Staff",
      parentId: "5",
      gender: "Female",
    },
    {
      id: "10",
      name: "Santi",
      jabatan: "Staff",
      parentId: "5",
      gender: "Female",
    },
    {
      id: "11",
      name: "Eka",
      jabatan: "Staff",
      parentId: "5",
      gender: "Female",
    },
    { id: "12", name: "Toni", jabatan: "Staff", parentId: "6", gender: "Male" },
    {
      id: "13",
      name: "Ayu",
      jabatan: "Staff",
      parentId: "6",
      gender: "Female",
    },
    {
      id: "14",
      name: "Mita",
      jabatan: "Staff",
      parentId: "6",
      gender: "Female",
    },
    {
      id: "15",
      name: "Hana",
      jabatan: "Staff",
      parentId: "6",
      gender: "Female",
    },
  ];

  // Fungsi untuk membuat data di Firestore
  const createDataInFirestore = async () => {
    try {
      for (const member of organizationData) {
        await firestore().collection("organization").add(member);
        console.log(`Added: ${member.name}`);
      }
      Alert.alert("Success", "Organization data has been added!");
    } catch (error) {
      console.error("Error adding organization data:", error);
      Alert.alert("Error", "Failed to add organization data.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Organization Data</Text>
      <Button title="Create Data" onPress={createDataInFirestore} />
      <Text style={styles.note}>
        This will add predefined organizational data to Firestore with the
        following structure:
      </Text>
      {organizationData.map((member) => (
        <View key={member.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>
            {member.name} - {member.jabatan} ({member.gender})
          </Text>
          {member.parentId && (
            <Text style={styles.subText}>Reports to: {member.parentId}</Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default CreateOrganizationPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  note: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.light.darkBlue,
  },
  subText: {
    fontSize: 14,
    color: Colors.light.softBlue,
  },
});
