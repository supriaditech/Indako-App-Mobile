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
      name="inbox"
      options={{
        title: "Inbox",
      }}
    />
    <Stack.Screen
      name="detail-inbox"
      options={{
        title: "Detail Inbox",
      }}
    />
  </Stack>
);

export default Layout;
