import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// status: "loading" | "out" (not logged in) | "denied" (logged in, not admin) | "admin"
export function useAdmin() {
  const [s, setS] = useState({ status: auth ? "loading" : "out", user: null });

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, async (user) => {
      if (!user) return setS({ status: "out", user: null });
      setS({ status: "loading", user });
      try {
        const snap = await getDoc(doc(db, "admins", user.uid));
        setS({ status: snap.exists() ? "admin" : "denied", user });
      } catch {
        setS({ status: "denied", user });
      }
    });
  }, []);

  return s;
}
