import { atom, useAtom } from "jotai";
import { Info, infos } from "./data";

type Config = {
  selected: Info["id"] | null;
};

const configAtom = atom<Config>({
  selected: infos[0].id,
});

export function useInfo() {
  return useAtom(configAtom);
}
