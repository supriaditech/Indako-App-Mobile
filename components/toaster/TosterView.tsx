import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type IconName = "checkcircleo" | "exclamationcircleo" | "closecircleo";
const ToastView = ({
  iconName,
  text,
  backgroundColor,
}: {
  iconName: IconName;
  text: string;
  backgroundColor: string;
}): React.JSX.Element => (
  <View style={[styles.toastContainer, { backgroundColor }]}>
    <AntDesign
      name={iconName}
      size={24}
      color="white"
      style={{ width: "10%" }}
    />
    <Text style={styles.toastText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  toastContainer: {
    height: 60,
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
  },
  toastText: {
    color: "white",
    fontWeight: "bold",
    width: "90%",
  },
});
export default ToastView;
