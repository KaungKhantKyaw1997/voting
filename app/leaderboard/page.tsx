"use client";
import Header from "@/components/header";
import styles from "./Leaderboard.module.css";
import LeaderboardList from "@/components/LeaderboardList";

export default function LeaderBoardPage() {
  const goLeaderboard = () => {};
  return (
    <div className={styles.pageContainer}>
      <Header
        leftText="leaderboard"
        leftImage="/images/FOE.png"
        rightImage="/images/Season.png"
        onClick={goLeaderboard}
      />
      <LeaderboardList />
    </div>
  );
}
