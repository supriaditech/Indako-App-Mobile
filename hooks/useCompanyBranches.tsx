// useCompanyBranches.js
import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore"; // Import Firestore
import { showToast } from "@/components/ui/toast"; // Ensure you have this for feedback

export interface CompanyBranch {
  id: string; // Document ID
  latitude: string; // Latitude as a string
  location: string; // Location description
  longitude: string; // Longitude as a string
  office_name: string; // Name of the office
}

// useCompanyBranches.ts

const useCompanyBranches = () => {
  const [branches, setBranches] = useState<CompanyBranch[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      const snapshot = await firestore().collection("CompanyBranches").get();
      const branchesData: CompanyBranch[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as CompanyBranch[];
      setBranches(branchesData);
    } catch (error) {
      console.error("Error fetching branches: ", error);
      showToast({
        message: "Gagal mengambil data cabang.",
        type: "error",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return {
    branches,
    loading,
  };
};

export { useCompanyBranches };
