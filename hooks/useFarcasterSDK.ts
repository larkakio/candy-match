"use client";

import { useAccount } from "wagmi";

type User = {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
};
type SDKActions = {
  actions: { openUrl: (u: string) => void; close: () => void };
} | null;

export function useFarcasterSDK() {
  const { address } = useAccount();
  const user: User | null = address
    ? {
        fid: 0,
        displayName: `${address.slice(0, 6)}…${address.slice(-4)}`,
      }
    : null;

  return {
    sdk: null as SDKActions,
    isReady: true,
    user,
    openUrl: (url: string) => {
      window.open(url, "_blank", "noopener,noreferrer");
    },
    close: () => {},
  };
}
