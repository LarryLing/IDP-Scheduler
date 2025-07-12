import { z } from "zod";
import { PlayerFormSchema } from "./schemas.ts";

export const DEFAULT_PLAYER: z.infer<typeof PlayerFormSchema> = {
  name: "",
  number: 0,
  position: "Goalkeeper",
  availabilities: [],
} as const;

export const POSITIONS = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
] as const;

export const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export const TIME_REGEX = /^(1[0-2]|0?[1-9]):([0-5][0-9])([AP]M)$/;
export const TIME_MESSAGE = "Time must be in format '9:30AM' or '12:45PM'.";
