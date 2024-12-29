import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CompanyBranch } from "@/hooks/useCompanyBranches";

export interface User {
  uid: string;
  email: string | null;
  firstName?: string;
  lastName?: string;
  jabatan?: string;
  gender?: string;
  phoneNumber?: string;
  branch?: string | null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userBranch: CompanyBranch | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userBranch, setUserBranch] = useState<CompanyBranch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      const storedBranch = await AsyncStorage.getItem("branch");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      if (storedBranch) {
        setUserBranch(JSON.parse(storedBranch));
      }
      setLoading(false);
    };

    const fetchUserWithRetry = async (
      uid: string,
      maxRetries = 5,
      delay = 1000
    ) => {
      for (let attempt = 1; attempt <= maxRetries; attempt++) {
        const userDoc = await firestore().collection("users").doc(uid).get();
        if (userDoc.exists) {
          return userDoc.data();
        }
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      console.error("Failed to fetch user document after maximum retries.");
      return null;
    };

    const unsubscribe = auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await fetchUserWithRetry(firebaseUser.uid);
        if (userData) {
          const user = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            ...userData,
          } as User;
          setUser(user);
          await AsyncStorage.setItem("user", JSON.stringify(user));

          if (user.branch) {
            const branchDoc = await firestore()
              .collection("CompanyBranches")
              .doc(user.branch)
              .get();
            if (branchDoc.exists) {
              const branchData: CompanyBranch = {
                id: branchDoc.id,
                location: branchDoc.data()?.location || "",
                latitude: branchDoc.data()?.latitude || "",
                longitude: branchDoc.data()?.longitude || "",
                office_name: branchDoc.data()?.office_name || "",
              };
              setUserBranch(branchData);
              await AsyncStorage.setItem("branch", JSON.stringify(branchData));
            } else {
              console.error("Branch document not found for ID:", user.branch);
            }
          }
        } else {
          console.error("Failed to fetch user document.");
        }
      } else {
        setUser(null);
        setUserBranch(null);
        await AsyncStorage.multiRemove(["user", "branch"]);
      }
    });

    initializeAuth();
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, userBranch, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
