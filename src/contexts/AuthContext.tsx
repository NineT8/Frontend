import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import api from "@/lib/api";

// Define what a User looks like in our app
interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  created_at: string;
}

// Define the shape of our AuthContext
interface AuthContextType {
  user: User | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check if the user is already logged in when the app starts
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    setLoading(false);
  }, []);

  // Handle User Registration
  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data } = await api.post("/auth/signup", {
        email,
        password,
        name,
      });

      // Save user data to local storage so they stay logged in
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      setUser(data);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to sign up");
    }
  };

  // Handle User Login
  const signIn = async (email: string, password: string) => {
    try {
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      // Save user data to local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      setUser(data);
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to sign in");
    }
  };

  // Handle User Logout
  const signOut = () => {
    // Clear local storage
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    setUser(null);
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};