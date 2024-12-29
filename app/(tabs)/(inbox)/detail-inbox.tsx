import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import HeaderInbox from "@/components/inbox/HeaderInbox";
import { useInbox } from "@/hooks/useInbox";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const DetailInbox = () => {
  const { inboxData, loading } = useInbox();

  const { item }: any = useLocalSearchParams(); // Gunakan useLocalSearchParams
  const inboxItem = item ? JSON.parse(item) : null;

  if (!inboxItem) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No data found.</Text>
      </View>
    );
  }

  const { subject, content, timestamp } = inboxItem;

  const formattedTimestamp = timestamp
    ? new Date(timestamp.seconds * 1000).toLocaleString()
    : "No timestamp";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <ScrollView>
        {/* Header */}
        <HeaderInbox inboxData={inboxData} />

        {/* Kontainer utama */}
        <View style={styles.messageContainer}>
          {/* Judul pesan */}
          <View style={styles.subjectContainer}>
            <Text style={styles.subjectText}>{subject}</Text>
          </View>

          {/* Isi pesan */}
          <View style={styles.contentContainer}>
            <Text style={styles.contentText}>{content}</Text>
            <Text style={styles.timestampText}>Sent: {formattedTimestamp}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 10,
          }}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back-outline" size={24} color="black" />
          <Text>Back</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailInbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  messageContainer: {
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  subjectContainer: {
    backgroundColor: "#007bff",
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  subjectText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  contentContainer: {
    borderColor: "#007bff",
    borderRadius: 8,
    padding: 8,
    backgroundColor: "#fff",
  },
  contentText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  timestampText: {
    fontSize: 12,
    color: "#888",
    textAlign: "right",
  },
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
  },
});
