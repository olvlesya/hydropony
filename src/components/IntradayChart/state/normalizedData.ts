import { atom } from "recoil";

export type normalized = {
  [key: string]: {
    [key: string]: string | number;
  };
};

export const normalizedDataAtom = atom<normalized>({
  key: "intradayChart/normalizedData",
  default: {},
});
