"use client";
import { useEffect, useState } from "react";
import styles from "./leaderboardList.module.css";
import { fetchContestants, Contestant } from "@/services/votingService";

type LeaderBoardsCardProps = {
  id: number;
  name: string;
  vote: number;
  image: string;
  goDetail: () => void;
};
export default function LeaderboardList() {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  useEffect(() => {
    fetchContestants().then(setContestants);
  }, []);
  return (
    <>
      <div className={styles.listContainer}>
        {contestants.map((c) => (
          <div className={styles.leaderCard} key={c.id}>
            <label className={styles.number}># {c.id}</label>
            <img className={styles.img} src={c.image} />
            <label>{c.name}</label>
            <label className={styles.votingCount}>
              {c.votes.toLocaleString()}
              <span className={styles.label}>Votes</span>
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
