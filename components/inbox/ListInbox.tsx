import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

interface ListInboxProps {
  loading: boolean;
  inboxData: any[];
}

const ListInbox = ({ inboxData, loading }: ListInboxProps) => {
  const navigation = useNavigation(); // Untuk navigasi ke halaman detail
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk memfilter data berdasarkan query
  const filteredData = inboxData.filter((item) =>
    item.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Render item untuk FlatList
  const renderItem = ({ item }: any) => {
    const timestamp = item.timestamp
      ? new Date(item.timestamp.seconds * 1000).toLocaleString()
      : "No timestamp";

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          router.push(
            `/detail-inbox?item=${encodeURIComponent(JSON.stringify(item))}`
          )
        }
      >
        <MaterialCommunityIcons name="email-outline" size={40} color="black" />
        <View style={styles.textContainer}>
          <Text style={styles.subjectText}>{item.subject}</Text>
          <Text
            style={styles.contentText}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {item.content}
          </Text>
          <Text style={styles.timestampText}>{timestamp}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search by subject"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No results found</Text>
          }
        />
      )}
    </View>
  );
};

export default ListInbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  searchBar: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  subjectText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#333",
  },
  contentText: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
    color: "#555",
    marginTop: 5,
  },
  timestampText: {
    fontFamily: "Poppins-Regular",
    fontSize: 10,
    color: "#888",
    marginTop: 5,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#888",
    marginTop: 20,
  },
});
