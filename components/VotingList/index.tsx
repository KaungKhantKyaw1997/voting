"use client";

import { useEffect, useState } from "react";
import {
  fetchContestants,
  getAwardType,
  getAwardTypeList,
  getCandidate,
  getVoteListing,
  register,
  voteContestant,
} from "@/services/votingService";
import VoteBottomSheet from "../VoteBottomSheet";
import styles from "./VotingList.module.css";
import {
  AwardTypeData,
  AwardTypeListData,
  CandidatesDataList,
  Contestant,
  CredentialData,
  VotingSettingData,
} from "@/models/main";
import { getCredential } from "@/services/mainSerive";
import { decrypt } from "@/services/cryptoService";
import ContestantCard from "../ContestantCard";

export default function VotingList({ columns = 2 }) {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  // const [selected, setSelected] = useState<Contestant | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [awardType, setAwardType] = useState<AwardTypeData[]>([]);
  const [awardTypeList, setAwardTypeList] = useState<AwardTypeListData[]>([]);
  const [voteSetting, setVoteSetting] = useState<VotingSettingData[]>([]);
  const [candidates, setCandidate] = useState<CandidatesDataList[]>([]);
  const [selected, setSelected] = useState<CandidatesDataList | null>(null);

  // useEffect(() => {
  //   fetchContestants().then(setContestants);
  // }, []);
  useEffect(() => {
    const credential = getCredential();
    const reqData = {
      app_version: credential.appVersion,
      device_id: credential.deviceId,
      session_id: credential.sessionId,
      user_id: credential.userId,
    };
    function fetchVoteListing() {
      getVoteListing(reqData)
        .then((data) => {
          const dData = JSON.parse(decrypt(data.data));
          setVoteSetting(dData);
          console.log(dData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function fetchAwartType() {
      getAwardType(reqData)
        .then((data) => {
          const dData = JSON.parse(decrypt(data.data));
          setAwardType(dData);
          console.log(dData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function fetchAwardTypeList() {
      getAwardTypeList(reqData)
        .then((data) => {
          const dData = JSON.parse(decrypt(data.data));
          setAwardTypeList(dData);
          console.log(dData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    function fetchCandidate() {
      const reqData = {
        app_version: credential.appVersion,
        device_id: credential.deviceId,
        session_id: credential.sessionId,
        user_id: credential.userId,
        award_type_id: "1",
      };
      getCandidate(reqData)
        .then((data) => {
          const dData = JSON.parse(decrypt(data.data));
          setCandidate(dData);
          console.log(dData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    fetchVoteListing();
    fetchAwartType();
    fetchAwardTypeList();
    fetchCandidate();
  }, []);

  const handleVote = (id: number) => {
    voteContestant(id).then((updated) => {
      setContestants((prev) =>
        prev.map((c) => (c.id === id ? { ...c, votes: updated.votes } : c)),
      );
      // Close bottom sheet after voting
      setIsSheetOpen(false);
    });
  };
  // {contestants.map((c) => (
  //             <ContestantCard
  //               key={c.id}
  //               name={c.name}
  //               votes={c.votes}
  //               image={c.image}
  //               onVote={() => {
  //                 setSelected(c);
  //                 setIsSheetOpen(true);
  //               }}
  //             />
  //           ))}
  //
  return (
    <>
      <div className={styles.listContainer}>
        <div
          className={styles.cardGrid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {candidates.map((c) => (
            <ContestantCard
              key={c.candidate_category_id}
              name={c.name}
              votes={c.vote_count}
              image={c.image_url}
              onVote={() => {
                setSelected(c);
                setIsSheetOpen(true);
              }}
            />
          ))}
        </div>
      </div>

      {selected && (
        <VoteBottomSheet
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          name={selected.name}
          votes={selected.vote_count}
          image={selected.image_url}
          onVote={() => handleVote(Number(selected.candidate_category_id))}
        />
      )}
    </>
  );
}
