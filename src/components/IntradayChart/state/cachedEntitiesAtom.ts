import { atom } from "recoil";

export const cachedEntitiesAtom = atom<string[]>({
  key: "intradayChart/cachedEntities",
  default: [],
});
