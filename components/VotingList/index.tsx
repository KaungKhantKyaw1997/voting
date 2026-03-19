"use client";

import { useEffect, useState } from "react";
import {
  fetchContestants,
  voteContestant,
  Contestant,
} from "@/services/votingService";
import ContestantCard from "../ContestantCard";
import VoteBottomSheet from "../VoteBottomSheet";
import styles from "./VotingList.module.css";

export default function VotingList({ columns = 2 }) {
  const [contestants, setContestants] = useState<Contestant[]>([]);
  const [selected, setSelected] = useState<Contestant | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  useEffect(() => {
    fetchContestants().then(setContestants);
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

  return (
    <>
      <div className={styles.listContainer}>
        <div
          className={styles.cardGrid}
          style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
          {contestants.map((c) => (
            <ContestantCard
              key={c.id}
              name={c.name}
              votes={c.votes}
              image={c.image}
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
          votes={selected.votes}
          image={selected.image}
          onVote={() => handleVote(selected.id)}
        />
      )}
    </>
  );
}
