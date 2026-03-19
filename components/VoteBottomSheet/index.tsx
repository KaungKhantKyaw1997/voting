"use client";

import { FC } from "react";
import styles from "./VoteBottomSheet.module.css";

type VoteBottomSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  votes: number;
  image: string;
  onVote: () => void;
};

const VoteBottomSheet: FC<VoteBottomSheetProps> = ({
  isOpen,
  onClose,
  name,
  votes,
  image,
  onVote,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.sheet} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src="/svg/close.svg" alt="close" />
        </button>

        <img src={image} className={styles.image} />
        <p className={styles.name}>{name}</p>
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
  );
};

export default VoteBottomSheet;
