import { atom } from "recoil";

export const dateRangeAtom = atom<number>({
  key: "dailyChart/dateRange",
  default: 1,
});
