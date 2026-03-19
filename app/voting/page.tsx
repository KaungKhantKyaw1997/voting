"use client";

import Header from "@/components/Header";
import VotingList from "@/components/VotingList";
import styles from "./VotingPage.module.css";

export default function VotingPage() {
  return (
    <div className={styles.pageContainer}>
      <Header
        leftText="contestants"
        rightText="leaderboard>"
        showRightText={true}
        leftImage="/images/FOE.png"
        rightImage="/images/Season.png"
        rightIcon="/svg/leader-board.svg"
      />

      <VotingList />
    </div>
  );
}
