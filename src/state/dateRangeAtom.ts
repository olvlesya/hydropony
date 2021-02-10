import { atom } from "recoil";

export const dateRangeAtom = atom<number>({
  key: "dateRange",
  default: 1,
});
