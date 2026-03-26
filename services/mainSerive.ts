"use client";
import { CredentialData } from "@/models/main";
import { decrypt, encrypt } from "./cryptoService";
import { CREDENTIAL } from "@/public/custom/credential";
export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
  };
};
export const setItem = (key: string, value: any) => {
  sessionStorage.setItem(key, value);
};
export const getItem = (key: string) => {
  const value = sessionStorage.getItem(key);
  return value;
};
// export const setCommonItem = (key: string, value: any) => {
// }
export const setCredential = (credentialData: CredentialData) => {
  setItem("credential", encrypt(JSON.stringify(credentialData)));
};
export const getCredential = (): CredentialData => {
  let credential = getItem("credential") || "";
  if (credential === "") {
    setCredential(CREDENTIAL);
    return CREDENTIAL;
  } else {
    return JSON.parse(decrypt(credential));
  }
};
