import { atom } from "recoil";

export const activeEntitiesAtom = atom<string[]>({
  key: "activeEntities",
  default: [],
});
