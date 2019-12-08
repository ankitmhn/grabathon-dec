import { DTMF_CHAR } from "../actions/types";

const INITIAL_STATE = { buffer: "" };

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case DTMF_CHAR:
      return {
        ...state,
        buffer: buffer + action.char
      };
    default:
      return state;
  }
};
