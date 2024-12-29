import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import HeaderAttendance from "@/components/Attendance/HeaderAttendance";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/constants/Colors";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { AntDesign } from "@expo/vector-icons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import Modal from "react-native-modal";

export default function AttendanceScreen() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const cameraRef = useRef<any>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState({ title: "", message: "" });

  const toggleCameraFacing = () => {
    setFacing(facing === "back" ? "front" : "back");
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        setPhoto(photo.uri);
      } catch (error) {
        showAlertModal("Error", "Gagal mengambil foto.");
      }
    } else {
      showAlertModal("Error", "Kamera tidak siap.");
    }
  };

  const resetPhoto = () => {
    setPhoto(null);
  };

  const showAlertModal = (title: string, message: string) => {
    setAlertData({ title, message });
    setShowAlert(true);
  };

  const submitAttendance = async () => {
    const user = auth().currentUser;

    if (!user) {
      showAlertModal("Error", "Anda harus login terlebih dahulu.");
      return;
    }

    if (!photo || !location) {
      showAlertModal("Error", "Foto dan lokasi diperlukan untuk absensi.");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const attendanceRef = firestore()
      .collection("attendance")
      .where("userId", "==", user.uid)
      .where("date", "==", today);

    try {
      const existingAttendance = await attendanceRef.get();
      if (!existingAttendance.empty) {
        showAlertModal("Error", "Anda sudah melakukan absensi hari ini.");
        return;
      }

      const fileName = `${user.uid}_${Date.now()}.jpg`;
      const photoURL = `https://via.placeholder.com/300?text=${fileName}`;

      const attendanceData = {
        userId: user.uid,
        date: today,
        location: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        photoURL,
        timestamp: new Date().toISOString(),
      };

      await firestore().collection("attendance").add(attendanceData);

      showAlertModal("Success", "Absensi berhasil disimpan.");
      setPhoto(null);
    } catch (error) {
      showAlertModal("Error", "Terjadi kesalahan saat menyimpan absensi.");
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.containerPermission}>
        <AntDesign name="camerao" size={200} color="black" />
        <Text style={styles.massagePermission}>
          We need your permission to access the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.buttonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderAttendance />
        <View style={styles.cameraContainer}>
          {!photo ? (
            <CameraView style={styles.camera} facing={facing} ref={cameraRef} />
          ) : (
            <Image source={{ uri: photo }} style={styles.camera} />
          )}
        </View>

        {!photo ? (
          <>
            <TouchableOpacity
              onPress={toggleCameraFacing}
              style={styles.buttonFlip}
            >
              <Text style={styles.buttonText}>Flip Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={takePhoto} style={styles.button}>
              <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={submitAttendance} style={styles.button}>
              <Text style={styles.buttonText}>Submit Absensi</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetPhoto} style={styles.button}>
              <Text style={styles.buttonText}>Retake Photo</Text>
            </TouchableOpacity>
          </>
        )}

        {location ? (
          <MapView
            style={styles.map}
            region={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Lokasi Anda"
            />
          </MapView>
        ) : (
          <Text>No location data</Text>
        )}
      </ScrollView>

      {/* Modern Alert */}
      <Modal isVisible={showAlert} onBackdropPress={() => setShowAlert(false)}>
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>{alertData.title}</Text>
          <Text style={styles.alertMessage}>{alertData.message}</Text>
          <TouchableOpacity
            onPress={() => setShowAlert(false)}
            style={styles.alertButton}
          >
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  cameraContainer: {
    width: "100%",
    height: 300,
  },
  camera: {
    width: "100%",
    height: 300,
  },
  button: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonFlip: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 40,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  map: {
    width: "100%",
    height: 230,
    borderRadius: 20,
    marginTop: 10,
  },
  alertContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  alertMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  alertButton: {
    backgroundColor: Colors.light.darkBlue,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  alertButtonText: {
    color: "white",
    fontSize: 16,
  },
  containerPermission: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  massagePermission: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
    fontFamily: "Poppins-Regular",
  },
});
