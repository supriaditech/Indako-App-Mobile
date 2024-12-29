import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const About = () => {
  const { userBranch } = useAuth();
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.branchContainer}>
          <Text style={styles.textTitleMap}>
            {userBranch?.office_name || "No Branch"}
          </Text>
          <Text style={styles.textAddressMapStyle}>
            {userBranch?.location || "No Location"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back-outline" size={24} color="black" />
        <Text>Back</Text>
      </TouchableOpacity>
      <Image
        source={require("../../../assets/images/Home/Product/product1.png")}
        style={styles.productImage}
        resizeMode="contain"
      />
      <Text style={styles.aboutText}>
        Indako Treading adalah perusahaan yang berkomitmen untuk menyediakan
        produk dan layanan berkualitas tinggi di bidang industri. Berikut adalah
        beberapa poin penting tentang kami:
        {"\n"}
        {"\n"}
        <Text style={styles.boldText}>Misi Kami:</Text>
        <Text style={styles.pointText}>
          • Menyediakan produk yang memenuhi dan melampaui harapan pelanggan.
        </Text>
        <Text style={styles.pointText}>
          • Membangun hubungan jangka panjang dengan pelanggan melalui kualitas.
        </Text>
        {"\n"}
        <Text style={styles.boldText}>Visi Kami:</Text>
        <Text style={styles.pointText}>
          • Menjadi mitra terpercaya dalam industri.
        </Text>
        <Text style={styles.pointText}>
          • Fokus pada inovasi dan keberlanjutan.
        </Text>
        {"\n"}
        <Text style={styles.boldText}>Produk Kami:</Text>
        <Text style={styles.pointText}>• Ban berkualitas tinggi.</Text>
        <Text style={styles.pointText}>• Suku cadang yang handal.</Text>
        <Text style={styles.pointText}>
          • Layanan purna jual yang memuaskan.
        </Text>
        {"\n"}
        Bergabunglah dengan kami dalam perjalanan ini dan temukan bagaimana
        Indako Treading dapat membantu Anda mencapai tujuan bisnis Anda.
      </Text>
    </SafeAreaView>
  );
};

export default About;

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
  aboutText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: Colors.light.darkBlue,
    marginTop: 20,
    lineHeight: 20,
  },
  boldText: {
    fontFamily: "Poppins-Bold",
    color: Colors.light.darkBlue,
    fontSize: 16,
    marginTop: 10,
  },
  pointText: {
    fontFamily: "Poppins-Regular",
    color: Colors.light.darkBlue,
    fontSize: 14,
    marginLeft: 10,
    lineHeight: 18,
  },
  productImage: {
    width: "100%",
    height: 200, // Sesuaikan tinggi sesuai kebutuhan
    marginTop: 20,
    borderRadius: 10,
    borderColor: Colors.light.softBlue,
  },
});
