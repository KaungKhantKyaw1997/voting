"use client";
import CryptoJS from "crypto-js";
import { getCredential } from "./mainSerive";
const votingSecret = "sJE4K8LnwmVAo3gd1b6mVQ==";
const votingIV = process.env.NEXT_PUBLIC_VOTINGIV;
const votingHashSecretKey = "197C5F370D70";
export function encrypt(plainTest: string): string {
  const iv = CryptoJS.lib.WordArray.random(16);
  if (!votingSecret) {
    throw new Error("votingSecret is not defined. Please check .env.local");
  }

  const keyBytes = CryptoJS.enc.Base64.parse(votingSecret);
  const encrypted = CryptoJS.AES.encrypt(plainTest, keyBytes, {
    iv: iv,
  });
  const encryptedBase64 = encrypted.toString();
  const ivWords = iv.words;
  const encryptedBytes = CryptoJS.enc.Base64.parse(encryptedBase64).words;
  const combindedWords = ivWords.concat(encryptedBytes);
  const combinedBase64 = CryptoJS.lib.WordArray.create(combindedWords).toString(
    CryptoJS.enc.Base64,
  );
  return combinedBase64;
}
export function decrypt(cipherText: string) {
  const encryptedBytes = CryptoJS.enc.Base64.parse(cipherText);
  const keyBytes = CryptoJS.enc.Base64.parse(votingSecret);
  const iv = encryptedBytes.words.slice(0, 4);
  const ciphertext = encryptedBytes.words.slice(4);
  const CipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.lib.WordArray.create(ciphertext),
  });
  const decrypted = CryptoJS.AES.decrypt(CipherParams, keyBytes, {
    iv: CryptoJS.lib.WordArray.create(iv),
  });
  const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}
export function hashValueVoting(message: string) {
  let hashedMessage = CryptoJS.HmacSHA256(
    message,
    votingHashSecretKey,
  ).toString(CryptoJS.enc.Base64);

  return hashedMessage;
}
export function encryptObj(obj: any) {
  for (let key in obj) {
    const value = obj[key];
    const encrypted = encrypt(value);
    obj[key] = encrypted;
  }
  return obj;
}
export function encryptBody(body: object, appVersion: string) {
  body = Object.fromEntries(
    Object.entries(body).filter(([KeyboardEvent, value]) => value !== ""),
  );
  let signatureReqFormatForHashing = JSON.stringify({
    ...body,
    app_version: getCredential().appVersion,
  });
  let reqHashValue = hashValueVoting(signatureReqFormatForHashing);
  const encryptedObj = encryptObj(body);
  encryptedObj.hash_value = reqHashValue;
  encryptedObj.app_version = getCredential().appVersion;
  return encryptedObj;
}
