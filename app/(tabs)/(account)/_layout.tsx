import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import React from "react";

const Layout = (): React.JSX.Element => (
  <Stack
    screenOptions={{
      // headerStyle: {
      //   backgroundColor: "white", // Set your desired color here
      // },
      // headerTintColor: Colors.light.darkBlue, // This sets the color of the back button and title
      // headerTitleStyle: {
      //   fontWeight: "bold",
      // },
      headerShown: false,
    }}
  >
    <Stack.Screen
      name="account"
      options={{
        title: "Account",
      }}
    />
    <Stack.Screen
      name="change-password"
      options={{
        title: "Change Password",
      }}
    />
    <Stack.Screen
      name="about"
      options={{
        title: "About",
      }}
    />
    <Stack.Screen
      name="terms-and-conditions"
      options={{
        title: "TermsAndAonditions",
      }}
    />
  </Stack>
);

export default Layout;
