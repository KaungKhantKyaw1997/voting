export class CredentialData {
  walletUserId: string = "";
  sessionId: string = "";
  deviceId: string = "";
  appVersion: string = "";
  userId: string = "";
}
export class RegisterData {
  user_id: string = "";
  wallet_user_id: string = "";
  full_name: string = "";
  email: string = "";
  nrc_number: string = "";
  status: string = "";
}
export type Contestant = {
  id: number;
  name: string;
  votes: number;
  image: string;
};
export interface StateData {
  status: string;
  data: any;
}
export class RequestData {
  device_id: string = "";
  session_id: string = "";
  app_version: string = "";
}
export class UserRequestData extends RequestData {
  user_id: string = "";
}
export class CandidateReqData extends RequestData {
  user_id: string = "";
  award_type_id: string = "";
}
export class VotingSaveData extends RequestData {
  user_id: string = "";
  candidate_id: string = "";
  quantity: string = "";
  device_hash: string = "";
  award_type_id: string = "";
}
export class VotingSettingData {
  setting_id: string = "";
  key_name: string = "";
  key_key: string = "";
}
export class AwardTypeListData {
  award_type_id: string = "";
  description: string = "";
  end_date: string = "";
  start_date: string = "";
  status: string = "";
  title: string = "";
}
export class AwardTypeData {
  award_type_id: string = "";
  candidates: CandidatesDataList[] = [];
  description: string = "";
  end_date: string = "";
  start_date: string = "";
  status: string = "";
  title: string = "";
}
export class CandidatesDataList {
  award_type_id: string = "";
  candidate_category_id: string = "";
  candidate_id: string = "";
  image_url: string = "";
  name: string = "";
  vote_count: string = "";
  code: string = "";
}
export class ApiResponse {
  data: string = "";
  message: string = "";
  status: string = "";
  status_code: number = 0;
  hash_value: string = "";
}
export class VotingHistoryData {
  [date: string]: VotingHistoryDetialData[];
}
export class VotingHistoryDetialData {
  award_type_id: string = "";
  candidate: CandidatesDataList = new CandidatesDataList();
  candidate_id: string = "";
  created_at: string = "";
  quantity: string = "";
  user_id: string = "";
  vote_id: string = "";
}
export class RegisterReqData extends RequestData {
  wallet_user_id: string = "";
  // mobile_number = '';
}
export class TownshipData {
  id: string = "";
  nrcNoCode: string = "";
  nrcTownshipCode: string = "";
}
export class PublicRegister {
  app_version: string = "";
  hash_value: string = "";
  mobile_number: string = "";
  full_name: string = "";
  nrc_number: string = "";
  email: string = "";
}
export class DivisionReq {
  app_version: string = "";
}
export class TownshipReq {
  app_version: string = "";
  division_code: string = "";
}
export class SendOTPReq {
  app_version: string = "";
  mobile_number: string = "";
}
export class VerifyOTPReq {
  app_version: string = "";
  mobile_number: string = "";
  otp: string = "";
}
export class SelectBoxData {
  id: string = "";
  name: string = "";
}
export class DivisionResponseData {
  division_code: string = "";
  division_name: string = "";
}
export class TownshipResponseData {
  short_name: string = "";
  township_code: string = "";
  township_name: string = "";
}
export class NrcTypeResponseData {
  id: string = "";
  nrcType: string = "";
}
