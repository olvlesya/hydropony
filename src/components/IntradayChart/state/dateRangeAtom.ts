import { atom } from "recoil";

export const dateRangeAtom = atom<number>({
  key: "intradayChart/dateRange",
  default: 1,
});
