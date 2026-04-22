export const WS_URL = import.meta.env.VITE_WS_URL;

export const STATUS = {
  IDLE: "idle",
  SEARCHING: "searching",
  CONNECTED: "connected",
  DISCONNECTED: "disconnected"
};

export const EVENTS = {
  START: "start",
  MESSAGE: "message",
  SKIP: "skip",
  END: "end"
};

export const SENDER = {
  YOU: "you",
  STRANGER: "stranger"
};