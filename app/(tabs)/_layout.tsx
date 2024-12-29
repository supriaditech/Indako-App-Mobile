import { Redirect, router, Tabs, useRouter, useSegments } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  AntDesign,
  Feather,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAuth } from "@/contexts/AuthContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // Cleanup subscription on unmount
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (user && !inAuthGroup) {
      router.replace("/(tabs)"); // Ganti dengan rute beranda Anda
      router.reload();
    } else if (!user && inAuthGroup) {
      router.replace("/login"); // Ganti dengan rute login Anda
    }
  }, [user, initializing, segments]);

  if (initializing) {
    return <ActivityIndicator size="large" color="#0000ff" />; // Tampilkan indikator pemuatan
  }

  if (!user) {
    return null;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Feather name="home" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="(team)"
        options={{
          title: "Team",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(attendance)"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color }) => (
            <AntDesign name="filetext1" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(inbox)"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color }) => (
            <Feather name="inbox" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(account)"
        options={{
          title: "Account",
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
