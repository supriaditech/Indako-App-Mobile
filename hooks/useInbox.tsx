import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";

const useInbox = () => {
  const [inboxData, setInboxData] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk memuat data dari Firestore
  const fetchInboxData = async () => {
    try {
      const snapshot = await firestore().collection("inbox").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInboxData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inbox data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInboxData();
  }, []);
  return {
    inboxData,
    loading,
  };
};

export { useInbox };
