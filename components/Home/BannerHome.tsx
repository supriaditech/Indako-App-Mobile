import { Colors } from "@/constants/Colors";
import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Image } from "react-native";
import PagerView from "react-native-pager-view";

const BannerHome = () => {
  const images = [
    require("../../assets/images/Home/banner1.png"),
    require("../../assets/images/Home/banner2.png"),
    require("../../assets/images/Home/banner1.png"),
  ];

  const [pageIndex, setPageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const pagerViewRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (direction === 1) {
        if (pageIndex === images.length - 1) {
          setDirection(-1);
          setPageIndex(pageIndex - 1);
          (pagerViewRef.current as any).setPage(pageIndex - 1);
        } else {
          setPageIndex(pageIndex + 1);
          (pagerViewRef.current as any).setPage(pageIndex + 1);
        }
      } else {
        if (pageIndex === 0) {
          setDirection(1);
          setPageIndex(pageIndex + 1);
          (pagerViewRef.current as any).setPage(pageIndex + 1);
        } else {
          setPageIndex(pageIndex - 1);
          (pagerViewRef.current as any).setPage(pageIndex - 1);
        }
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [pageIndex, images.length, direction]);

  return (
    <View style={styles.container}>
      <PagerView
        ref={pagerViewRef}
        style={styles.pagerView}
        onPageSelected={(e) => setPageIndex(e.nativeEvent.position)}
        initialPage={0}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.page}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </PagerView>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor:
                  pageIndex === index
                    ? Colors.light.darkBlue
                    : Colors.light.skyBlue,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 160,
  },
  pagerView: {
    flex: 1,
    width: "100%",
  },
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 130,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  dotContainer: {
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});

export default BannerHome;
