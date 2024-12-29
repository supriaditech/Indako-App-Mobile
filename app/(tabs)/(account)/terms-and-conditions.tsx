import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const TermsAndAonditions = () => {
  const { userBranch } = useAuth();
  return (
    <SafeAreaView
      style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 20 }}
    >
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Syarat dan Ketentuan</Text>
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
      <ScrollView style={{ paddingBottom: 40 }}>
        <Text style={styles.termsText}>
          <Text style={styles.boldText}>Syarat dan Ketentuan</Text>
          {"\n"}
          {"\n"}
          Selamat datang di Indako Treading. Dengan mengakses atau menggunakan
          layanan kami, Anda setuju untuk terikat oleh syarat dan ketentuan
          berikut. Jika Anda tidak setuju dengan syarat ini, harap jangan
          menggunakan layanan kami.
          {"\n"}
          {"\n"}
          <Text style={styles.boldText}>1. Penggunaan Layanan</Text>
          <Text style={styles.pointText}>
            • Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang
            sah dan sesuai dengan hukum yang berlaku.
          </Text>
          <Text style={styles.pointText}>
            • Anda tidak boleh menggunakan layanan kami dengan cara yang dapat
            merusak, menonaktifkan, atau membebani server kami.
          </Text>
          {"\n"}
          <Text style={styles.boldText}>2. Akun Pengguna</Text>
          <Text style={styles.pointText}>
            • Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun
            Anda dan untuk semua aktivitas yang terjadi di akun Anda.
          </Text>
          <Text style={styles.pointText}>
            • Anda setuju untuk memberi tahu kami segera jika ada penggunaan
            yang tidak sah atas akun Anda.
          </Text>
          {"\n"}
          <Text style={styles.boldText}>3. Kebijakan Pembayaran</Text>
          <Text style={styles.pointText}>
            • Semua pembayaran harus dilakukan sesuai dengan metode yang
            ditentukan di situs kami.
          </Text>
          <Text style={styles.pointText}>
            • Kami berhak untuk mengubah harga produk dan layanan kapan saja
            tanpa pemberitahuan sebelumnya.
          </Text>
          {"\n"}
          <Text style={styles.boldText}>4. Pembatalan dan Pengembalian</Text>
          <Text style={styles.pointText}>
            • Anda dapat membatalkan pesanan Anda dalam waktu 24 jam setelah
            pemesanan.
          </Text>
          <Text style={styles.pointText}>
            • Pengembalian dana akan diproses sesuai dengan kebijakan
            pengembalian kami.
          </Text>
          {"\n"}
          <Text style={styles.boldText}>5. Tanggung Jawab</Text>
          <Text style={styles.pointText}>
            • Kami tidak bertanggung jawab atas kerugian atau kerusakan yang
            timbul dari penggunaan layanan kami.
          </Text>
          {"\n"}
          <Text style={styles.boldText}>6. Perubahan Syarat dan Ketentuan</Text>
          <Text style={styles.pointText}>
            • Kami berhak untuk mengubah syarat dan ketentuan ini kapan saja.
            Perubahan akan diberitahukan melalui situs kami.
          </Text>
          {"\n"}
          Dengan menggunakan layanan kami, Anda menyetujui syarat dan ketentuan
          ini. Jika Anda memiliki pertanyaan, silakan hubungi kami.
        </Text>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndAonditions;

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
  termsText: {
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
