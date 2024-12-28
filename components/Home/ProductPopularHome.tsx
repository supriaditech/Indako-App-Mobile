import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const ProductPopularHome = () => {
  return (
    <View>
      <Text style={styles.titleProductPopular}>Product Popular</Text>
      <View style={styles.countainerProductPopularStyle}>
        <View style={styles.countainerItemProduct}>
          <View style={styles.countainerImageProductStyle}>
            <Image
              source={require("../../assets/images/Home/Product/product1.png")}
              style={styles.imageProductStyle}
            />
            <Text style={styles.titleProductStyle}>Honda Stylo</Text>
          </View>
          <View style={styles.containerDescriptionProductStyle}>
            <Text style={styles.textPriceStyle}>Rp. 28.000.00</Text>
            <View style={styles.countainerStokandColorStyle}>
              <Text style={styles.textStokStyle}>Stok : 5</Text>
              <View>
                <View style={styles.countainerColorsStyle}>
                  <TouchableOpacity style={styles.colorRedStyle} />
                  <TouchableOpacity style={styles.colorBlackStyle} />
                  <TouchableOpacity style={styles.colorBlueStyle} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.countainerItemProduct}>
          <View style={styles.countainerImageProductStyle}>
            <Image
              source={require("../../assets/images/Home/Product/product2.png")}
              style={styles.imageProductStyle}
            />
            <Text style={styles.titleProductStyle}>Honda Vario 160</Text>
          </View>
          <View style={styles.containerDescriptionProductStyle}>
            <Text style={styles.textPriceStyle}>Rp. 32.000.00</Text>
            <View style={styles.countainerStokandColorStyle}>
              <Text style={styles.textStokStyle}>Stok : 8</Text>
              <View>
                <View style={styles.countainerColorsStyle}>
                  <TouchableOpacity style={styles.colorRedStyle} />
                  <TouchableOpacity style={styles.colorBlackStyle} />
                  <TouchableOpacity style={styles.colorBlueStyle} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductPopularHome;

const styles = StyleSheet.create({
  colorBlueStyle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: "blue",
  },
  colorBlackStyle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: "black",
  },
  colorRedStyle: {
    width: 10,
    height: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  countainerColorsStyle: {
    flexDirection: "row",
    gap: 4,
  },
  textStokStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  countainerStokandColorStyle: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    alignItems: "center",
  },
  textPriceStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  containerDescriptionProductStyle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  titleProductStyle: {
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: "white",
  },
  imageProductStyle: {
    position: "absolute",
    width: 130,
    aspectRatio: 1,
    height: undefined,
    bottom: 16,
  },
  countainerImageProductStyle: {
    backgroundColor: Colors.light.darkBlue,
    height: 120,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignItems: "center",
    position: "relative",
  },
  countainerItemProduct: {
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
    backgroundColor: "white",
    borderRadius: 20,
    width: "48%",
  },
  countainerProductPopularStyle: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  titleProductPopular: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
});
