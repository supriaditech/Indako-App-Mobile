import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera"; // Gunakan Camera dari expo-camera
import { AntDesign } from "@expo/vector-icons";
import * as faceApi from "face-api.js"; // Import face-api.js
import HeaderAttendance from "@/components/Attendance/HeaderAttendance"; // Komponen Header yang sudah ada
import { Colors } from "@/constants/Colors"; // Untuk warna tema

const Attendance = () => {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [detections, setDetections] = useState<any>(null);
  const cameraRef = useRef<any>(null); // Referensi untuk Camera
  const [mlAlgorithm, setMlAlgorithm] = useState(false);
  useEffect(() => {
    console.log("checkkkk useEffect"); // Debugging untuk memastikan useEffect berjalan

    const loadModels = async () => {
      try {
        console.log("Model loading started...");

        // Pastikan menggunakan path yang benar dan cek jika ada kesalahan dalam pemuatan
        await faceApi.nets.ssdMobilenetv1.loadFromUri(
          "../../../assets/models/"
        );
        console.log("Model ssdMobilenetv1 loaded");

        await faceApi.nets.faceLandmark68Net.loadFromUri(
          "../../../assets/models/"
        );
        console.log("Model faceLandmark68Net loaded");

        await faceApi.nets.faceRecognitionNet.loadFromUri(
          "../../../assets/models/"
        );
        console.log("Model faceRecognitionNet loaded");

        // Set mlAlgorithm setelah semua model berhasil dimuat
        setMlAlgorithm(true);
        console.log("Models Loaded!");
      } catch (error) {
        console.error("Error loading models: ", error); // Error handling jika loading gagal
      }
    };

    loadModels();
  }, []); // Pastikan useEffect hanya dijalankan sekali saat komponen dimount

  useEffect(() => {
    if (mlAlgorithm) {
      const interval = setInterval(() => {
        detectFace();
      }, 1000); // Deteksi wajah setiap 1 detik

      return () => clearInterval(interval); // Bersihkan interval saat komponen dibersihkan
    } // Bersihkan interval saat komponen dibersihkan
  }, [mlAlgorithm]);

  const detectFace = async () => {
    console.log("==", cameraRef);
    console.log("==sss", cameraRef.current);
    console.log("==sss", mlAlgorithm);
    if (cameraRef.current) {
      const video = cameraRef.current.recordAsync(); // Mendapatkan stream video dari Camera
      console.log("==========", video);
      if (video) {
        // Gambar video stream ke dalam canvas

        // Deteksi wajah menggunakan face-api.js
        const detectFace = async () => {
          if (cameraRef.current && mlAlgorithm === true) {
            const video = cameraRef.current.recordAsync();
            if (video) {
              const detections = await faceApi
                .detectAllFaces(video)
                .withFaceLandmarks()
                .withFaceDescriptors();
              setDetections(detections);
              console.log("Detections:", detections);
            }
          }
          requestAnimationFrame(detectFace); // Panggil ulang fungsi untuk terus-menerus mendeteksi
        };

        console.log("Detections:", detections); // Log hasil deteksi wajah
      }
    }
  };

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

  const toggleCameraFacing = () => {
    setFacing((prevFacing) => (prevFacing === "back" ? "front" : "back"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <HeaderAttendance />
      <CameraView
        style={styles.camera}
        facing={facing}
        ref={cameraRef}
        onCameraReady={() => setIsCameraReady(true)} // Menandakan kamera siap
        onMountError={(error) => console.log("Camera Mount Error", error)} // Menangani error saat mount kamera
      >
        {/* Canvas untuk menampilkan hasil video stream */}

        {detections && detections.length > 0 && (
          <View style={styles.overlay}>
            {detections.map((detection: any, index: number) => {
              const { alignedRect } = detection;
              const { x, y, width, height } = alignedRect;
              return (
                <View
                  key={index}
                  style={[styles.faceBox, { top: y, left: x, width, height }]}
                />
              );
            })}
          </View>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={toggleCameraFacing} style={styles.button}>
            <Text style={styles.buttonText}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={detectFace} style={styles.button}>
          <Text style={styles.buttonText}>Detect Faces</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

export default Attendance;

const styles = StyleSheet.create({
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
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: Colors.light.darkBlue,
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
  camera: {
    height: "45%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  faceBox: {
    borderColor: "red",
    borderWidth: 2,
    position: "absolute",
    zIndex: 20,
  },
});
