import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const CreateInboxPage: React.FC = () => {
  // Data dummy untuk tabel inbox
  const inboxData = [
    {
      id: "1",
      subject: "Meeting Reminder",
      content:
        "This is a friendly reminder about the upcoming meeting scheduled for tomorrow at 10 AM in the main conference room. Please ensure you review the agenda sent earlier and prepare any necessary documents. \n\nYour punctual attendance is highly appreciated. If you have any questions or concerns, feel free to reach out to the meeting organizer. We look forward to your active participation in the discussions.",
      timestamp: new Date(),
    },
    {
      id: "2",
      subject: "Product Inquiry",
      content:
        "Hello, I hope this email finds you well. I am interested in learning more about your latest product offerings. Could you please provide detailed specifications, pricing information, and availability? \n\nAdditionally, I would like to know about any ongoing promotions or discounts applicable to bulk purchases. Thank you for your assistance, and I look forward to your response at your earliest convenience.",
      timestamp: new Date(),
    },
    {
      id: "3",
      subject: "Event Invitation",
      content:
        "You are cordially invited to our annual company gathering happening this Friday at 6 PM. The event will feature a guest speaker, an awards ceremony, and dinner, providing an opportunity to connect with colleagues and celebrate our achievements. \n\nPlease RSVP by Wednesday to confirm your attendance. We hope to see you there for an enjoyable evening filled with networking and camaraderie.",
      timestamp: new Date(),
    },
    {
      id: "4",
      subject: "Feedback Request",
      content:
        "We value your feedback and would greatly appreciate it if you could take a moment to complete our customer satisfaction survey. Your insights are invaluable in helping us improve our services and tailor our offerings to better suit your needs. \n\nThe survey will only take about 5 minutes to complete. As a token of our appreciation, participants will be entered into a raffle to win a special gift. Thank you for your time and support.",
      timestamp: new Date(),
    },
    {
      id: "5",
      subject: "Job Opportunity",
      content:
        "Dear Candidate, we are excited to inform you about a job opening that matches your profile. The role involves responsibilities in project management, effective communication, and technical expertise. \n\nPlease review the attached job description for a detailed overview of the position. If you are interested, kindly submit your application by the specified deadline. We look forward to welcoming you to our team.",
      timestamp: new Date(),
    },
    {
      id: "6",
      subject: "System Maintenance Notification",
      content:
        "This is to inform you that scheduled system maintenance will occur on Saturday from 12 AM to 6 AM. During this period, access to the system may be limited. \n\nWe apologize for any inconvenience caused and appreciate your understanding as we work to enhance the system's performance and reliability. If you have urgent concerns, please contact our support team.",
      timestamp: new Date(),
    },
    {
      id: "7",
      subject: "Policy Update",
      content:
        "We are writing to notify you about recent updates to our company policies. These changes are aimed at aligning with current regulations and improving operational efficiency. \n\nPlease review the updated policies in the attached document. It is important that all employees comply with the new guidelines starting next month. Should you have any questions, feel free to reach out to the HR department.",
      timestamp: new Date(),
    },
  ];

  // Fungsi untuk membuat data di Firestore
  const createInboxInFirestore = async () => {
    try {
      for (const inbox of inboxData) {
        await firestore().collection("inbox").add({
          subject: inbox.subject,
          content: inbox.content,
          timestamp: inbox.timestamp,
        });
      }
      Alert.alert("Success", "Inbox data has been added!");
    } catch (error) {
      console.error("Error adding inbox data:", error);
      Alert.alert("Error", "Failed to add inbox data.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Create Inbox Data</Text>
      <Button title="Create Inbox" onPress={createInboxInFirestore} />
      <Text style={styles.note}>
        This will add predefined inbox data to Firestore with the following
        structure:
      </Text>
      {inboxData.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Text style={styles.itemText}>{item.subject}</Text>
          <Text style={styles.subText}>{item.content}</Text>
          <Text style={styles.timestamp}>
            {item.timestamp.toLocaleString()}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default CreateInboxPage;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  note: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    marginBottom: 20,
    textAlign: "center",
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginTop: 5,
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
    marginTop: 5,
  },
});
