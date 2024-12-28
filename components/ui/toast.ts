import Toast from "react-native-toast-message";

type ToastPosition = "top" | "bottom";

interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "sendVerifikasiEmail";
  position: ToastPosition;
}

export const showToast = ({ message, type, position }: ToastProps): void => {
  let backgroundColor: string;
  let icon: string;

  switch (type) {
    case "success":
      backgroundColor = "#28a745"; // Hijau untuk sukses
      icon = "check-circle"; // Asumsi Anda menggunakan beberapa ikon
      break;
    case "error":
      backgroundColor = "#dc3545"; // Merah untuk error
      icon = "times-circle"; // Asumsi Anda menggunakan beberapa ikon
      break;
    case "info":
      backgroundColor = "#17a2b8"; // Biru untuk informasi
      icon = "info-circle"; // Asumsi Anda menggunakan beberapa ikon
      break;
    default:
      backgroundColor = "#6c757d"; // Default grey
      icon = "bell"; // Default icon
  }

  Toast.show({
    type,
    position,
    text1: message,
    text2: "", // Contoh jika Anda ingin menambahkan teks tambahan
    visibilityTime: 4000, // Waktu tampilan
    autoHide: type !== "sendVerifikasiEmail", // Otomatis sembunyi
    topOffset: 50, // Offset dari atas
    bottomOffset: 40,
    props: {
      backgroundColor,
      icon,
    },
  });
};
