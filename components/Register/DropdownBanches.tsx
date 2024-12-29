// DropdownBanches.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Modal,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // Sesuaikan dengan struktur proyek Anda
import { CompanyBranch, useCompanyBranches } from "@/hooks/useCompanyBranches";

interface DropdownBranchesProps {
  selectedBranch: CompanyBranch | null;
  setSelectedBranch: (branch: CompanyBranch) => void;
}
const DropdownBanches = ({
  selectedBranch,
  setSelectedBranch,
}: DropdownBranchesProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { branches, loading } = useCompanyBranches();

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectBranch = (branch: CompanyBranch) => {
    setSelectedBranch(branch);
    setDropdownVisible(false);
  };

  if (loading) {
    return <Text>Loading...</Text>; // Tampilkan loading jika data sedang diambil
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titlePasswordInputStyle}>Pilih Cabang</Text>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <View style={styles.dropdownContent}>
          <MaterialCommunityIcons
            name="office-building"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <Text style={styles.dropdownText}>
            {selectedBranch ? selectedBranch.office_name : "Pilih Cabang"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Modal for Dropdown Options */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={dropdownVisible}
        onRequestClose={toggleDropdown}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dropdownList}>
            <FlatList
              data={branches}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => selectBranch(item)}
                >
                  <Text style={styles.dropdownItemText}>
                    {item.office_name}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <Pressable style={styles.closeButton} onPress={toggleDropdown}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownBanches;

const styles = StyleSheet.create({
  container: {},
  titlePasswordInputStyle: {
    paddingBottom: 4,
    color: Colors.light.gray,
    fontFamily: "Poppins-Regular",
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: Colors.light.darkBlue,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  dropdownText: {
    marginLeft: 10,
    color: Colors.light.gray,
    fontFamily: "Poppins-Regular",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Latar belakang semi-transparan
  },
  dropdownList: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5,
    width: "90%",
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    width: "100%",
  },
  dropdownItemText: {
    color: Colors.light.darkBlue,
    fontFamily: "Poppins-Regular",
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: Colors.light.darkBlue,
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontFamily: "Poppins-Regular",
  },
  iconInputStyle: {
    color: Colors.light.darkBlue,
    fontFamily: "Poppins-Regular",
  },
});
