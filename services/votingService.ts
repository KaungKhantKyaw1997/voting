import mockData from "@/data/mockData.json";

export type Contestant = {
  id: number;
  name: string;
  votes: number;
  image: string;
};

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
