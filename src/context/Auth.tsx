"use client";

import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../lib/firebaseConfig";
import { db } from "../lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface UserData {
  displayName: string;
  email: string;
  affiliated_to: string;
  uid: string;
  profilePicture: string;
  phone: string;
  rule: string;
  authToken: any;
  unitName: string;
  unitId: string;
}

interface AuthContextData {
  userAuthenticated: boolean;
  signIn: (
    email: string,
    password: string,
    stayConnected: boolean
  ) => Promise<void | string>;
  signOut: () => Promise<void | string>;
  forgotPassword: (email: string) => Promise<null | string>;
  isLoading: boolean;
  isLoadingLogin: boolean; 
  userData: UserData | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userAuthenticated, setIsUserAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const router = useRouter();

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      setIsLoading(true);

      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (user) {
        try {
          await user.reload(); // Recarrega pq pode ser que o token esteja armazenado no cache.
          const idTokenResult = await user.getIdTokenResult();

          if (!idTokenResult) {
            throw new Error("Usuário inválido!");
          }

          setIsUserAuthenticated(true);
          const claims = idTokenResult.claims;

          const userRef = doc(db, "users", user.uid);
          unsubscribeSnapshot = onSnapshot(
            userRef,
            (snapshot) => {
              const data = snapshot.data()!;
              setUserData({
                displayName: data.fullName,
                email: data.email,
                affiliated_to: data.affiliated_to,
                uid: data.uid,
                profilePicture: data.profilePicture,
                phone: data.phone,
                rule: claims.rule,
                authToken: idTokenResult,
                unitName: data.unitName,
                unitId: data.unitId,
              });
              setIsLoading(false);
            },
            (error) => {
              console.error("Erro no snapshot:", error);
              setIsLoading(false);
            }
          );
        } catch (err) {
          await signOut(auth);

          setIsUserAuthenticated(false);
          setUserData(null);
          router.push("/login");
        }
      } else {
        setIsUserAuthenticated(false);
        setUserData(null);
        router.push("/login");
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  async function signIn(email: string, password: string, checked: boolean) {
    try {
      setIsLoadingLogin(true);

      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const idTokenResult = await user.getIdTokenResult();

      const idToken = await user.getIdToken();
      const res = await fetch("/api/sessionLogin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const rawRole = idTokenResult.claims.rule;
      if (typeof rawRole !== "string") {
        await signOut(auth);
        setIsLoadingLogin(false);
        return "Acesso negado: sem regra válida.";
      }
      const role = rawRole;

      const allowedRoles = ["admin_franqueadora", "admin_unidade"];
      if (!allowedRoles.includes(role)) {
        await signOut(auth);
        setIsLoadingLogin(false);
        return "Acesso negado: você não tem permissão para acessar esta página!";
      }

      if (res.ok) {
        router.replace("/");
        setIsLoadingLogin(false);
      }
      return "Usuário autenticado com sucesso!";
    } catch (err: any) {
      setIsLoadingLogin(false);
      switch (err.code) {
        case "auth/invalid-email":
          return "E-mail inválido!";
        case "auth/user-disabled":
          return "Falha ao realizar o login conta desativada.";
        case "auth/user-not-found":
          return "Falha ao realizar o login usuário não encontrado.";
        case "auth/wrong-password":
          return "Falha ao realizar o login senha incorreta.";
        case "auth/too-many-requests":
          return "Muitas tentativas, tente novamente mais tarde.";
        case "auth/network-request-failed":
          return "Falha de conexão com a rede.";
        case "auth/invalid-credential":
          return "Falha ao realizar o login credenciais inválidas.";
        default:
          console.error(err);
          return "Erro desconhecido entre em contato com o suporte!";
      }
    }
  }

  async function handleSignOut() {
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("Nenhum usuário autenticado no momento.");
      }

      await signOut(auth);

      await fetch("/api/sessionLogout", { method: "POST" });

      router.push("/login");
    } catch (err: any) {
      switch (err.code) {
        case "auth/no-current-user":
          return "Nenhum usuário autenticado no momento.";
        case "auth/network-request-failed":
          return "Falha de conexão com a internet";
        default:
          console.error(err);
          return "Erro desconhecido ao deslogar, entre em contato com o suporte!";
      }
    }
  }

  async function forgotPassword(email: string) {
    try {
      await sendPasswordResetEmail(auth, email);
      return `Enviado para ${email}`;
    } catch (err: any) {
      switch (err.code) {
        case "auth/invalid-email":
          return "E-mail inválido!";
        case "auth/missing-email":
          return "E-mail não fornecido!";
        case "auth/user-not-found":
          return "Usuário não encontrado!";
        case "auth/too-many-requests":
          return "Muitas requisições em curto período";
        case "auth/network-request-failed":
          return "Falha na conexão de rede";
        default:
          console.error(err);
          return "Erro desconhecido, entre em contato com o suporte!";
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userAuthenticated,
        signIn,
        signOut: handleSignOut,
        isLoading,
        userData,
        forgotPassword,
        isLoadingLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
