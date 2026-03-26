"use client";

// import Header from "@/components/Header";
import VotingList from "@/components/VotingList";
import styles from "./VotingPage.module.css";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function VotingPage() {
  const router = useRouter();
  const goLeaderboard = () => {
    router.push("/leaderboard");
  };
  return (
    <div className={styles.pageContainer}>
      <Header
        leftText="contestants"
        rightText="leaderboard>"
        showRightText={true}
        leftImage="/images/FOE.png"
        rightImage="/images/Season.png"
        rightIcon="/svg/leader-board.svg"
        onClick={goLeaderboard}
      />

      <VotingList />
    </div>
  );
}
