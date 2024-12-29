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
import { Colors } from "@/constants/Colors"; // Adjust this import based on your project structure

interface DropdownGenderProps {
  gender: string;
  setGender: (value: string) => void;
}
const DropdownGender = ({ gender, setGender }: DropdownGenderProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const genderOptions = [
    { label: "Laki-laki", value: "male" },
    { label: "Perempuan", value: "female" },
  ];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const selectGender = (value: string) => {
    setGender(value);
    setDropdownVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titlePasswordInputStyle}>Jenis Kelamin</Text>
      <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
        <View style={styles.dropdownContent}>
          <MaterialCommunityIcons
            name="gender-male"
            size={24}
            color="black"
            style={styles.iconInputStyle}
          />
          <Text style={styles.dropdownText}>
            {gender
              ? genderOptions.find((option) => option.value === gender)?.label
              : "Pilih Jenis Kelamin"}
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
              data={genderOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => selectGender(item.value)}
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

export default DropdownGender;

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
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  dropdownList: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Add shadow for Android
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
