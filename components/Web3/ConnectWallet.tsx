'use client'

import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function ConnectWallet() {
  const { address, isConnected } = useAccount()
  const { connectors, connect } = useConnect()
  const { disconnect } = useDisconnect()

  if (isConnected) {
    return (
      <div className="flex flex-col items-center gap-2">
        <p className="text-white text-sm">Connected: {address?.slice(0, 6)}...{address?.slice(-4)}</p>
        <button
          onClick={() => disconnect()}
          className="bg-red-500/20 text-red-400 font-semibold py-2 px-4 rounded-lg hover:bg-red-500/30 transition-all border border-red-500/30"
        >
          Disconnect
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-lg w-full"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  )
}
