import mockData from "@/data/mockData.json";
import { getCredential, getHeader } from "./mainSerive";
import { decrypt, encryptBody } from "./cryptoService";
import {
  ApiResponse,
  AwardTypeListData,
  CandidateReqData,
  Contestant,
  RegisterReqData,
  UserRequestData,
  VotingSaveData,
} from "@/models/main";
import { APIConfig } from "@/public/custom/api";

const baseUrl = "https://uatvotingapi.uabpay.com.mm/api/";
const voteListingUrl = baseUrl + APIConfig.endpoint.votingListing;
const registerUrl = baseUrl + APIConfig.endpoint.register;
const awardTypesUrl = baseUrl + APIConfig.endpoint.awardType;
const awardTypeListUrl = baseUrl + APIConfig.endpoint.awardTypeList;
const candidateUrl = baseUrl + APIConfig.endpoint.candidates;
const votingHistoryUrl = baseUrl + APIConfig.endpoint.votingHistory;
const saveVotingUrl = baseUrl + APIConfig.endpoint.saveVote;

export function fetchContestants(): Promise<Contestant[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockData);
    }, 500);
  });
}

export function voteContestant(id: number): Promise<Contestant> {
  return new Promise((resolve, reject) => {
    const contestant = mockData.find((c) => c.id === id);
    if (contestant) {
      contestant.votes += 1;
      setTimeout(() => resolve(contestant), 300);
    } else {
      reject(new Error("Contestant not found"));
    }
  });
}
export const register = async (reqData: RegisterReqData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res: Response = await fetch(`${registerUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};
export const getVoteListing = async (reqData: UserRequestData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res = await fetch(`${voteListingUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};
export const getAwardType = async (reqData: UserRequestData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res = await fetch(`${awardTypesUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};
export const getAwardTypeList = async (reqData: UserRequestData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res = await fetch(`${awardTypeListUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};

export const getCandidate = async (reqData: CandidateReqData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res = await fetch(`${candidateUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};
export const getVotingHistory = async (reqData: UserRequestData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res = await fetch(`${votingHistoryUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};
export const saveVote = async (reqData: VotingSaveData) => {
  const encryptBodyData = encryptBody(reqData, getCredential().appVersion);
  const res = await fetch(`${saveVotingUrl}`, {
    method: "POST",
    headers: getHeader(),
    body: JSON.stringify(encryptBodyData),
  });
  const data: ApiResponse = await res.json();
  if (!res.ok) throw new Error(data?.data || "API Error");
  return data;
};
