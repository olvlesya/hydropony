import { atom } from "recoil";

type normalized = {
  [key: string]: {
    [key: string]: string | number;
  };
};

export const normalizedDataAtom = atom<normalized>({
  key: "dailyChart/normalizedData",
  default: {},
});
