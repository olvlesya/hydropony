import { atom } from "recoil";

export const activeEntitiesAtom = atom<string[]>({
  key: "dailyChart/activeEntities",
  default: [],
});
