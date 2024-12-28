import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { products } from "@/constants/DummyDataProduct";

const ListProductHome = () => {
  return (
    <View>
      <View style={styles.countainerListProductStyle}>
        <Text style={styles.titleListProductStyle}>List Product</Text>
        <TouchableOpacity>
          <Text style={styles.textViewAllStyle}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: 10 }}>
        {products.map((product) => (
          <View key={product.id}>
            <View style={styles.containerProductItemStyle}>
              <View style={styles.countainerDescriptionProductStyle}>
                <Image
                  style={styles.imageProductStyle}
                  source={product.image}
                />
                <View>
                  <Text style={styles.textTitleProductStyle}>
                    {product.name}
                  </Text>
                  <Text style={styles.textStokProductStyle}>
                    Stok : {product.stock}
                  </Text>
                  <Text style={styles.textPriceProductStyle}>
                    Rp. {product.price.toLocaleString()}
                  </Text>
                </View>
              </View>
              <View style={styles.countainerColorStyle}>
                <View style={styles.countainerColorsStyle}>
                  {product.colors.map((color, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[styles.colorStyle, { backgroundColor: color }]}
                    />
                  ))}
                </View>
                <TouchableOpacity
                  style={styles.countainerButtonViewDetailStyle}
                >
                  <Text style={styles.textViewDetailStyle}>View Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ListProductHome;

const styles = StyleSheet.create({
  textViewDetailStyle: {
    color: "white",
    fontFamily: "Poppins-SemiBold",
  },
  countainerButtonViewDetailStyle: {
    backgroundColor: Colors.light.darkBlue,
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  countainerColorStyle: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  textPriceProductStyle: {
    fontFamily: "Poppins-Regular",
    color: "red",
  },
  textStokProductStyle: {
    fontFamily: "Poppins-Regular",
  },
  textTitleProductStyle: {
    fontFamily: "Poppins-SemiBold",
  },
  imageProductStyle: {
    width: 70,
    aspectRatio: 1,
    height: undefined,
  },
  countainerDescriptionProductStyle: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  containerProductItemStyle: {
    backgroundColor: Colors.light.softGray,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textViewAllStyle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
  },
  titleListProductStyle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  colorStyle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  countainerListProductStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: 1,
  },
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
});
