import { atom } from "recoil";

export const cachedEntitiesAtom = atom<string[]>({
  key: "dailyChart/cachedEntities",
  default: [],
});
