import { StyleSheet, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderInbox from "@/components/inbox/HeaderInbox";
import ListInbox from "@/components/inbox/ListInbox";
import { useInbox } from "@/hooks/useInbox";

const Inbox = () => {
  const { inboxData, loading } = useInbox();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <HeaderInbox inboxData={inboxData} />
      <ListInbox inboxData={inboxData} loading={loading} />
      {/* <CreateInboxPage/> */}
    </SafeAreaView>
  );
};

export default Inbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "white",
  },
});
