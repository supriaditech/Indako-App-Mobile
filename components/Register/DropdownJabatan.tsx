// DropdownJabatan.js
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
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors"; // Sesuaikan dengan struktur proyek Anda

interface DropdownJabatanProps {
  jabatan: string;
  setJabatan: (value: string) => void;
}

const DropdownJabatan = ({ jabatan, setJabatan }: DropdownJabatanProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const jabatanOptions = [
    { label: "Direktur", value: "direktur" },
    { label: "Manager", value: "manager" },
    { label: "Supervisor", value: "supervisor" },
    { label: "Staf", value: "staf" },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectJabatan = (value: string) => {
    setJabatan(value);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePasswordInputStyle}>Jabatan</Text>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <View style={styles.dropdownContent}>
          <AntDesign
            name="user"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <Text style={styles.dropdownText}>
            {jabatan
              ? jabatanOptions.find((option) => option.value === jabatan)?.label
              : "Pilih Jabatan"}
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
              data={jabatanOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => selectJabatan(item.value)}
                >
                  <Text style={styles.dropdownItemText}>{item.label}</Text>
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

export default DropdownJabatan;

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
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Tambahkan bayangan untuk Android
  },
  dropdownItem: {
    padding: 10,
  },
  dropdownItemText: {
    color: Colors.light.gray,
    fontFamily: "Poppins-Regular",
  },
  closeButton: {
    marginTop: 10,
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
