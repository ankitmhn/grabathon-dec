import { WELCOME, DTMF_CHAR } from "./types";

export const welcome = () => {
  return { type: WELCOME };
};

export const dtmfChar = char => {
  return { type: DTMF_CHAR };
};
