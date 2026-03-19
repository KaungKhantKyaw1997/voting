"use client";

import styles from "./ContestantCard.module.css";

type ContestantCardProps = {
  name: string;
  votes: number;
  image: string;
  onVote?: () => void;
};

export default function ContestantCard({
  name,
  votes,
  image,
  onVote,
}: ContestantCardProps) {
  return (
    <div className={styles.card}>
      <div
        className={styles.cardImage}
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className={styles.cardBottom}>
        <p className={styles.cardName}>{name}</p>

        <div className={styles.bottomRow}>
          <div className={styles.votesInfo}>
            <p className={styles.votingCount}>Voting Count</p>
            <p className={styles.cardVotes}>
              <span className={styles.votesNumber}>{votes}</span>{" "}
              <span className={styles.votesText}>votes</span>
            </p>
          </div>
          <button className={styles.voteButton} onClick={onVote}>
            Vote
          </button>
        </div>
      </div>
    </div>
  );
}
